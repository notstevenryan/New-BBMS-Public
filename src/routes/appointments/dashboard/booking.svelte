<script>
  import { onMount } from 'svelte';
  import { fetchLocations, fetchAvailability, bookAppointment } from '$lib/appointmentsHelper.js';
  import { initializeFlatpickr } from '$lib/flatpickr.js';

  let locations = [];
  let selectedLocation = '';
  let locationDetails = '';
  let availability = {};
  let selectedDate = '';
  let selectedTime = '';
  let donationType = '';
  let numpax = '';
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

    if (locations.length > 0) {
      selectedLocation = locations[0].name;
      updateLocationDetails();
    }

    datePickerInstance = initializeFlatpickr((selectedDates) => {
      if (selectedDates.length > 0) {
        selectedDate = selectedDates[0];

        const adjustedSelectedDate = new Date(selectedDate);
        adjustedSelectedDate.setHours(adjustedSelectedDate.getHours() + 8);

        const formattedDate = adjustedSelectedDate.toISOString().split('T')[0];

        if (selectedLocation) {
          fetchAvailability(formattedDate, selectedLocation).then(data => {
            availability = data;
            availableSlots = { ...availability };
          });
        }
      }
    });
  });

  const adjustedDate = (date) => {
    const localDate = new Date(date);
    localDate.setDate(localDate.getDate() + 1);
    return localDate.toISOString().split('T')[0];
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (donationType === 'group' && !numpax) {
      alert("Please select the number of people for group donations.");
      return;
    }
    const adjusted = adjustedDate(selectedDate);
    await bookAppointment(e, adjusted, selectedLocation, selectedTime, availability, donationType, numpax);
    selectedDate = '';
    selectedTime = '';
    donationType = '';
    numpax = '2'; // Reset after submission
  };

</script>

<main>
  <div class="justify-content-center" id="header">
    <h2>📅 Book an Appointment</h2>
  </div>

  <form on:submit={handleFormSubmit} class="appointment-form">
    <div class="form-left">
      <div class="form-group">
        <label for="location"><b>Location:</b></label>
        <hr class="dashed">
        {#if locationDetails}
          <p><b>Name:</b> {locationDetails.name}</p>
          <p><b>Address:</b> {locationDetails.address}</p>
          <p><b>Contact:</b> {locationDetails.contact_numbers}</p>
          <p><b>Email:</b> {locationDetails.email}</p>
        {:else}
          <p>Loading location details...</p>
        {/if}
        <hr class="dashed">
      </div>

      <link rel="stylesheet" type="text/css" href="https://npmcdn.com/flatpickr/dist/themes/airbnb.css">
      <div class="form-group" id="date-picker">
        <label for="date"><b>Select Date:</b></label>
      </div>
      <p style="padding-top: 20px;">
        {selectedDate ? `Selected Date: ${adjustedDate(selectedDate)}` : 'No date selected yet.'}
      </p>
    </div>

    <div class="form-right">
      <div class="form-group">
        <label for="time"><b>Time Slot:</b></label>
        <select id="time" bind:value={selectedTime} disabled={!selectedDate || !selectedLocation}>
          <option value="" disabled selected>
            Please select a date to view availability
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

      <div class="form-group">
        <label for="donation-type"><b>Donation Type:</b></label>
        <select id="donation-type" bind:value={donationType}>
          <option value="">Select Donation Type</option>
          <option value="individual">Individual</option>
          <option value="group">Group</option>
        </select>
      </div>

      <div class="form-group" style:display={donationType === 'individual' ? 'block' : 'none'}>
        <label for="numpax"><b>Num of pax:</b></label>
        <select id="numpax" bind:value={numpax}>
          <option value="1">1</option>
        </select>
      </div>

      <div class="form-group" style:display={donationType === 'group' ? 'block' : 'none'}>
        <label for="numpax"><b>Num of pax (Up to 4):</b></label>
        <select id="numpax" bind:value={numpax}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      

      <div class="form-group">
        <button type="submit" style="border-radius: 5px;" 
          disabled={!selectedTime || !selectedDate || !donationType}>
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
  @media (max-width: 500px) {
    button {
      width: 100%;
    }
  }
</style>
