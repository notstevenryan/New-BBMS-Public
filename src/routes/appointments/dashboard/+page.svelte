<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';

  let locations = [];
  let selectedLocation = '';
  let locationDetails = '';
  let availability = {};
  let selectedDate = '';
  let selectedWeek = [];
  let datePickerInstance;

  // Fetch locations from Supabase
  const fetchLocations = async () => {
    let { data, error } = await supabase
      .from('locations')
      .select('name, address, contact_numbers, email');
    if (error) {
      console.error('Error fetching locations:', error.message);
    } else {
      locations = data;
    }
  };

  // Update selected location details
  const updateLocationDetails = () => {
    const location = locations.find(loc => loc.name === selectedLocation);
    locationDetails = location || null;
  };

  // Fetch availability for the selected month
  const fetchAppointments = async (month, year) => {
    let firstDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let { data, error } = await supabase
      .from('appointment_slots')
      .select('*')
      .gte('date', firstDayOfMonth.toISOString())
      .lte('date', lastDayOfMonth.toISOString());

    if (error) {
      console.error('Error fetching appointments:', error.message);
    } else {
      availability = {};
      data.forEach(appointment => {
        availability[appointment.date] = {
          availableSlots: appointment.available_slots,
          maxSlots: appointment.max_slots,
        };
      });
      updateFlatpickr();
    }
  };

  // Initialize Flatpickr
  const initializeFlatpickr = () => {
    datePickerInstance = flatpickr('#date-picker', {
      inline: true,
      minDate: () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Set to tomorrow
        return today.toISOString().split('T')[0];
      },
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        const date = dayElem.dateObj.toISOString().split('T')[0];
        if (availability[date]) {
          const { availableSlots } = availability[date];
          dayElem.style.backgroundColor = availableSlots === 0 ? '#d2261a' : '#6e9827'; // Red for fully booked, green for available
          dayElem.style.color = '#fff'; // White text for contrast
        } else {
          dayElem.style.backgroundColor = '#ddd'; // Grey for no data
          dayElem.style.color = '#000'; // Black text for grey background
        }
      },
      onChange: (selectedDates) => {
        selectedDate = selectedDates[0]?.toISOString().split('T')[0] || '';
        updateWeekAvailability(selectedDates[0]);
      }
    });
  };

  // Update Flatpickr based on availability
  const updateFlatpickr = () => {
    const availableDates = Object.keys(availability).filter(date => {
      return availability[date].availableSlots > 0;
    });
    const fullyBookedDates = Object.keys(availability).filter(date => {
      return availability[date].availableSlots === 0;
    });

    datePickerInstance.set('enable', availableDates);
    datePickerInstance.set('disable', fullyBookedDates);
  };

  // Update availability for the selected week
  const updateWeekAvailability = (date) => {
    if (!date) return;
    
    const selectedDate = new Date(date);
    const startOfWeek = selectedDate.getDate() - selectedDate.getDay(); // Sunday as start of week
    const endOfWeek = startOfWeek + 6;

    const weekDates = [];
    for (let d = startOfWeek; d <= endOfWeek; d++) {
      const weekDate = new Date(selectedDate);
      weekDate.setDate(d);
      const formattedDate = weekDate.toISOString().split('T')[0];
      weekDates.push({
        date: formattedDate,
        availability: availability[formattedDate] || { availableSlots: 0, maxSlots: 0 }
      });
    }

    selectedWeek = weekDates;
  };

  onMount(() => {
    fetchLocations();
    initializeFlatpickr();
    fetchAppointments(new Date().getMonth(), new Date().getFullYear());
  });

  // Handle form submission (book appointment)
  const bookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedLocation) {
      alert('Please fill all fields.');
      return;
    }
    alert('Appointment booked successfully!');
    // Reset form
    selectedDate = '';
    selectedLocation = '';
  };
</script>

<main>
  <h2>Dashboard</h2>
  <form on:submit={bookAppointment}>

    <!-- Location Selection -->
    <div>
      <label for="location">Location:</label>
      <select id="location" bind:value={selectedLocation} on:change={updateLocationDetails}>
        <option value="">Select a location</option>
        {#each locations as loc}
          <option value={loc.name}>{loc.name}</option>
        {/each}

        {#if locationDetails}
          <p><b>Address:</b> {locationDetails.address}</p>
          <p><b>Contact:</b> {locationDetails.contact_numbers}</p>
          <p><b>Email:</b> {locationDetails.email}</p>
        {/if}
      </select>
    </div>

    <!-- Flatpickr Date Picker -->
    <label for="date">Select Date:</label>
    <div id="date-picker"></div>
      <div>    <!-- Selected Week Availability -->
        {#if selectedDate}
          <div class="selected-date">Selected Date: {selectedDate}</div>
          <h4>Availability for the Week:</h4>
          <ul class="week-availability">
            {#each selectedWeek as { date, availability }}
              <li class={availability.availableSlots === 0 ? 'fully-booked' : availability.availableSlots > 0 ? 'available' : 'no-data'}>
                {date}: 
                {availability.availableSlots === 0 ? 'Not available' : availability.availableSlots > 0 ? `Available Slots: ${availability.availableSlots}` : 'No Data'}
              </li>
            {/each}
          </ul>
        {/if}      
      </div>

    <div>
      <br>
      <label for="time">Time:</label>
      <select id="time">
        <option value="9:00 AM">9:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="2:00 PM">2:00 PM</option>
        <option value="3:00 PM">3:00 PM</option>
        <option value="4:00 PM">4:00 PM</option>
        <option value="5:00 PM">5:00 PM</option>
      </select>
    </div>

    <button type="submit">Book Appointment</button>
  </form>
</main>

<style>
  form {
    max-width: 600px;
    margin: 1rem auto;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input, select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }

  /* Style for the week availability list */
  .week-availability {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .week-availability li {
    padding: 0.5rem;
    margin: 0.2rem 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .week-availability .available {
    background-color: #6e9827; /* Green for available */
    color: #fff;
  }
  
  .week-availability .fully-booked {
    background-color: #d2261a; /* Red for fully booked */
    color: #fff;
  }
  
  .week-availability .no-data {
    background-color: #ddd; /* Grey for no data */
    color: #000;
  }

  /* Highlight the selected date */
  .selected-date {
    font-weight: bold;
    margin-top: 1rem;
  }
  
</style>