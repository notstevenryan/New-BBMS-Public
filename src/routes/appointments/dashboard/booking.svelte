<script>
  import { onMount } from 'svelte';
  import { fetchLocations, fetchAvailability, initializeFlatpickr, bookAppointment } from '$lib/appointmentsHelper.js';
  
  let locations = [];
  let selectedLocation = '';
  let locationDetails = '';
  let availability = {};
  let selectedDate = '';
  let selectedTime = '';
  let donationType = '';
  let notes = '';
  let availableSlots = { Morning: 0, Afternoon: 0, Evening: 0 };
  let datePickerInstance;
  
  const updateLocationDetails = () => {
    const location = locations.find(loc => loc.name === selectedLocation);
    locationDetails = location || null;
    if (selectedDate) {
      fetchAvailability(selectedDate, selectedLocation).then(data => {
        availability = data;
        availableSlots = { ...availability };
      });
    }
  };
  
  onMount(async () => {
    locations = await fetchLocations();
    datePickerInstance = initializeFlatpickr((selectedDates) => {
      selectedDate = selectedDates[0]?.toISOString().split('T')[0] || '';
      if (selectedLocation) {
        fetchAvailability(selectedDate, selectedLocation).then(data => {
          availability = data;
          availableSlots = { ...availability };
        });
      }
    });
  });

  function adjustedDate(date) {
    const selected = new Date(date);
    selected.setDate(selected.getDate() + 1);
    return selected.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await bookAppointment(selectedDate, selectedLocation, selectedTime, donationType, notes, availability);
    selectedDate = '';
    selectedLocation = '';
    selectedTime = '';
    donationType = '';
    notes = '';
  };
  </script>
  
<main> 
  <div class="justify-content-center" 
    id="header" 
    >
    <h2>📅 Book an Appointment</h2>   
  </div>
    <form on:submit={handleFormSubmit} class="appointment-form" >
      <div class="form-left bg-light" style="padding: 20px; border-radius: 5px;">
        <!-- Location Selection -->
        <div class="form-group">
          <label for="location"><b>Location:</b></label>
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
          {:else}
            <p><i>Please select a location to see the details.</i></p>
          {/if}
        </div>
  
      <!-- Flatpickr Date Picker -->
      <link rel="stylesheet" type="text/css" href="https://npmcdn.com/flatpickr/dist/themes/airbnb.css">
      <div class="form-group" id="date-picker">
        <label for="date"><b>Select Date:</b></label>
      </div>
      <p style="padding-top: 20px;">
        {selectedDate ? `Selected Date: ${adjustedDate(selectedDate)}` : 'No date selected yet.'}
      </p>
      </div>
  
      <div class="form-right bg-light" style="padding: 20px; border-radius: 5px;">
        <!-- Time Window Selection -->
        <div class="form-group">
          <label for="time"><b>Time Slot:</b></label>
          <select id="time" bind:value={selectedTime} disabled={!selectedDate || !selectedLocation}>
            <option value="" disabled selected>
              Please select a location and date to view availability
            </option>
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
  
        <!-- Donation Type Selection -->
        <div class="form-group">
          <label for="donation-type"><b>Donation Type:</b></label>
          <select id="donation-type" bind:value={donationType}>
            <option value="">Select Donation Type</option>
            <option value="individual">Individual</option>
            <option value="group">Group</option>
            <option value="donation-drive">Donation Drive</option>
          </select>
        </div>
  
        <!-- Notes Section -->
        <div class="form-group">
          <label for="notes"><b>Notes (Optional):</b></label>
          <textarea id="notes" bind:value={notes} placeholder="Add any special instructions or notes..." style="padding: 10px; border-radius: 5px;"></textarea>
        </div>
  
      <div class="form-group">
        <button type="submit" style="border-radius: 5px;" disabled={!selectedTime || !selectedLocation || !selectedDate}>
            Book Appointment
        </button>
      </div>
    </div>
  </form>
</main>
  
<style>
  #header {
    position: sticky;
    top: 0;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
  }
  .appointment-form {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1000px;
    margin: 2rem auto;
  }
  .form-left, .form-right {
    flex: 1;
  }
  .form-group {
    margin-bottom: 1.5rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    background-color: #007bff;
    transition: background-color 0.3s ease;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    .appointment-form {
      flex-direction: column;
    }
  }
</style>
  