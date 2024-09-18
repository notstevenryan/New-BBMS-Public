<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';

  let locations = [];
  let selectedLocation = '';
  let locationDetails = '';
  let appointments = [];
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let availability = {};

  // Fetch locations from the Supabase database
  const fetchLocations = async () => {
    let { data, error } = await supabase
      .from('locations')
      .select('name, address');

    if (error) {
      console.error('Error fetching locations:', error.message);
    } else {
      locations = data;
    }
  };

  // Update the selected location and display the address
  const updateLocationDetails = () => {
    const location = locations.find(loc => loc.name === selectedLocation);
    locationDetails = location ? location.address : '';
  };

  onMount(() => {
    fetchLocations();
  });

  // Fetch appointment slots for the current month
  const fetchAppointments = async () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

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
    }
  };

  // Helper function to get the number of days in the current month
  const daysInMonth = () => new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate the days for the current month
  const generateCalendar = () => {
    let days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
      const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      days.push({ date: dateString, availability: availability[dateString] });
    }
    return days;
  };

  // Call fetchAppointments on page mount
  onMount(() => {
    fetchAppointments();
  });

    // Color logic based on availability
    const getColor = (day) => {
    if (!day.availability) return 'grey'; // No data for the day

    const { availableSlots, maxSlots } = day.availability;

    if (availableSlots === 0) return 'red'; // Fully booked
    if (availableSlots < maxSlots) return 'orange'; // Reduced availability
    return 'green'; // Fully open
  };

    let date = '';
    let time = '';
    let appointmentList = [];
  
    const timeOptions = [
      "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    
    const bookAppointment = (e) => {
      e.preventDefault();
  
      if (!date || !time || !location) {
        alert('Please fill all fields.');
        return;
      }
  
      appointmentList = [
        ...appointmentList,
        { date, time, location }
      ];
  
      alert('Appointment booked successfully!');
      
      // Clear form
      date = '';
      time = '';
      location = '';
    };
</script>

<main>

  <h2>Dashboard</h2>
  
  <!-- Booking Form -->
  <form on:submit={bookAppointment}>
    <div>
      <label for="date">Date:</label>
      <input type="date" id="date" bind:value={date} required />
    </div>

    <div class="calendar">
      {#each generateCalendar() as day}
        <div class="day {getColor(day)}">
          {new Date(day.date).getDate()}
        </div>
      {/each}
    </div>
  
    <div>
      <label for="time">Time:</label>
      <select id="time" bind:value={time}>
        <option value="">Select time</option>
        {#each timeOptions as timeOption}
          <option value={timeOption}>{timeOption}</option>
        {/each}
      </select>
    </div>
  
    <div class="location-container">
      <h3>Select a Location:</h3>
      <select bind:value={selectedLocation} on:change={updateLocationDetails}>
        <option value="">Select a location</option>
        {#each locations as loc}
          <option value={loc.name}>{loc.name}</option>
        {/each}
      </select>
      
      {#if locationDetails}
        <div class="location-details">
          <p><b>Address:</b> {locationDetails}</p>
        </div>
      {/if}
    </div>
  
    <button type="submit">Book Appointment</button>
  </form>
  
  <!-- Appointment List -->
  <div class="appointment-list">
    <h3>Your Appointments</h3>
    {#if appointmentList.length > 0}
      {#each appointmentList as appointment}
        <div>
          <strong>Date:</strong> {appointment.date} <br>
          <strong>Time:</strong> {appointment.time} <br>
          <strong>Location:</strong> {appointment.location}
        </div>
      {/each}
    {:else}
      <p>No appointments booked yet.</p>
    {/if}
  </div>
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
  .appointment-list {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
  }
  .appointment-list div {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }

  .location-container {
    max-width: 600px;
    margin: 1rem auto;
  }

  .location-details {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #e2e2e2;
    border-radius: 8px;
    font-size: 1rem;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }

  .day {
    padding: 10px;
    border-radius: 4px;
    text-align: center;
  }

  .green {
    background-color: green;
    color: white;
  }

  .orange {
    background-color: orange;
    color: white;
  }

  .red {
    background-color: red;
    color: white;
  }

  .grey {
    background-color: lightgrey;
    color: black;
  }
</style>