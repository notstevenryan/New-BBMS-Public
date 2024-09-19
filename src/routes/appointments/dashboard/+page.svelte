<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';

  let locations = [];
  let selectedLocation = '';
  let locationDetails = '';
  let availability = {}; // Holds availability for the selected date
  let selectedDate = '';
  let selectedTime = ''; // Time window selected (Morning, Afternoon, Evening)
  let availableSlots = { Morning: 0, Afternoon: 0, Evening: 0 }; // Default slot values
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
    if (selectedDate) {
      fetchAvailability(selectedDate, selectedLocation);
    }
  };

  // Fetch availability for the selected date and location
  const fetchAvailability = async (date, location) => {
    let { data, error } = await supabase
      .from('appointment_slots')
      .select('*')
      .eq('date', date)
      .eq('location', location);

    if (error) {
      console.error('Error fetching availability:', error.message);
    } else {
      availability = { Morning: 0, Afternoon: 0, Evening: 0 };
      data.forEach(appointment => {
        availability[appointment.time_slot] = appointment.available_slots;
      });
      availableSlots = { ...availability };
      updateFlatpickr(); // Update Flatpickr based on availability
    }
  };

  // Initialize Flatpickr
  const initializeFlatpickr = () => {
    datePickerInstance = flatpickr('#date-picker', {
      inline: true,
      minDate: (() => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Set to tomorrow
        return today.toISOString().split('T')[0];
      })(),
      onChange: (selectedDates) => {
        selectedDate = selectedDates[0]?.toISOString().split('T')[0] || '';
        if (selectedLocation) {
          fetchAvailability(selectedDate, selectedLocation);
        }
      }
    });
  };

  // Update Flatpickr based on fetched availability
  const updateFlatpickr = () => {
    // Reset enabled dates
    datePickerInstance.set('enable', []);

    // Highlight available dates
    datePickerInstance.set('onDayCreate', (dObj, dStr, fp, dayElem) => {
      const date = dayElem.dateObj.toISOString().split('T')[0];
      if (availability[date]) {
        const totalAvailable = availability.Morning + availability.Afternoon + availability.Evening;
        dayElem.style.backgroundColor = totalAvailable === 0 ? '#d2261a' : '#6e9827'; // Red if fully booked, green if available
        dayElem.style.color = '#fff'; // White text for contrast
      }
    });

    // Re-render Flatpickr with updated availability data
    datePickerInstance.redraw();
  };

  // Handle form submission (book appointment)
  const bookAppointment = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedLocation || !selectedTime) {
      alert('Please fill all fields.');
      return;
    }

    if (availability[selectedTime] === 0) {
      alert('No available slots for the selected time.');
      return;
    }

    const { data, error } = await supabase
      .from('appointment_slots')
      .update({ available_slots: availability[selectedTime] - 1 })
      .eq('date', selectedDate)
      .eq('time_slot', selectedTime)
      .eq('location', selectedLocation);

    if (error) {
      console.error('Error booking appointment:', error.message);
    } else {
      alert('Appointment booked successfully!');
      // Update local availability
      availability[selectedTime] -= 1;
      selectedDate = '';
      selectedLocation = '';
      selectedTime = '';
    }
  };

  onMount(() => {
    fetchLocations();
    initializeFlatpickr();
  });
</script>

<main>
  <h2>Book an Appointment</h2>
  <form on:submit={bookAppointment}>
    <!-- Location Selection -->
    <div>
      <label for="location"><b>Location:</label>
      <select id="location" bind:value={selectedLocation} on:change={updateLocationDetails}>
        <option value="">Select a location</option>
        {#each locations as loc}
          <option value={loc.name}>{loc.name}</option>
        {/each}
      </select>

      {#if locationDetails}
        <p><b>Address:</b> {locationDetails.address}</p>
        <p><b>Contact:</b> {locationDetails.contact_numbers}</p>
        <p><b>Email:</b> {locationDetails.email}</p>
      {/if}
    </div>

    <!-- Flatpickr Date Picker -->
    <label for="date"><b>Select Date:</label>
    <div id="date-picker"></div>

    <!-- Time Window Selection (Display only if there are available slots) -->
    <div>
      <label for="time"><b>Time:</label>
      <select id="time" bind:value={selectedTime} disabled={!selectedDate || !selectedLocation}>
        <option value="">Select Time Window</option>
        {#if availableSlots.Morning > 0}
          <option value="Morning">Morning (09AM - 12PM) - {availableSlots.Morning} slots left</option>
        {/if}
        {#if availableSlots.Afternoon > 0}
          <option value="Afternoon">Afternoon (12PM - 04PM) - {availableSlots.Afternoon} slots left</option>
        {/if}
        {#if availableSlots.Evening > 0}
          <option value="Evening">Evening (04PM - 07PM) - {availableSlots.Evening} slots left</option>
        {/if}
      </select>
    </div>

    <button type="submit" disabled={!selectedTime || !selectedLocation || !selectedDate}>Book Appointment</button>
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
  
</style>