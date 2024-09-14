<script>
  import { onMount } from 'svelte';
  import { submitAppointment, fetchLocations } from '$lib/formUtils.js';

  let date = '';
  let time = '';
  let location = '';
  let name = '';
  let email = '';
  let donationType = 'individual';
  let notes = '';
  let locations = [];
  let locationDetails = '';
  let errors = {
    date: '',
    time: '',
    email: '',
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour < 10 ? '0' : ''}${hour}:00`;
      times.push(timeString);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();


  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.com');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    errors = { date: '', time: '', email: '' };

    let hasErrors = false;

    if (!date) {
      errors.date = 'Date is required.';
      hasErrors = true;
    } else if (new Date(date) < new Date()) {
      errors.date = 'Date cannot be in the past.';
      hasErrors = true;
    }

    if (!time) {
      errors.time = 'Time is required.';
      hasErrors = true;
    }

    if (!email || !validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
      hasErrors = true;
    }

    if (hasErrors) return;

    const { success, message } = await submitAppointment({ date, time, location, name, email, donationType, notes });

    if (success) {
      alert('Appointment booked successfully!');
      // Clear form
      date = '';
      time = '';
      location = '';
      name = '';
      email = '';
      donationType = 'individual';
      notes = '';
    } else {
      alert(`Error: ${message}`);
    }
  };

  const updateLocationDetails = () => {
    const selectedLocation = locations.find(loc => loc.name === location);
    locationDetails = selectedLocation ? selectedLocation.address : '';
  };

  onMount(async () => {
    const { locations: fetchedLocations, message } = await fetchLocations();
    if (fetchedLocations.length > 0) {
      locations = fetchedLocations;
    } else {
      console.error('Error fetching locations:', message);
    }
  });
</script>

<style>
  form {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: #0056b3;
  }

</style>

<br> <br>
<div class="form-container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="date">Appointment Date</label>
      <input
        type="date"
        id="date"
        bind:value={date}
        min="{new Date().toISOString().split('T')[0]}"
      />
      {#if errors.date}
        <div class="error">{errors.date}</div>
      {/if}
    </div>

    <div class="form-group">
      <label for="time">Appointment Time</label>
      <select id="time" bind:value={time}>
        <option value="">Select a time</option>
        {#each timeOptions as timeOption}
          <option value="{timeOption}">{timeOption}</option>
        {/each}
      </select>
      {#if errors.time}
        <div class="error">{errors.time}</div>
      {/if}
    </div>

    <div class="form-group">
      <label for="location">Location</label>
      <select id="location" bind:value={location} on:change={() => updateLocationDetails()}>
        <option value="">Select a location</option>
        {#each locations as loc}
          <option value="{loc.name}">{loc.name}</option>
        {/each}
      </select>
    </div>

    {#if locationDetails}
      <div class="form-group">
        <p><b>Address: </b>{locationDetails}</p>
      </div>
    {/if}

    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        bind:value={name}
      />
    </div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="example@domain.com"
      />
      {#if errors.email}
        <div class="error">{errors.email}</div>
      {/if}
    </div>

    <div class="form-group">
      <label for="donationType">Donation Type</label>
      <select id="donationType" bind:value={donationType}>
        <option value="individual">Individual</option>
        <option value="drive">Donation Drive</option>
      </select>
    </div>

    <div class="form-group">
      <label for="notes">Notes (optional)</label>
      <textarea
        id="notes"
        bind:value={notes}
        rows="3"
        placeholder="Additional information..."
      ></textarea>
    </div>

    <div class="form-group">
      <button type="submit">Book Appointment</button>
    </div>
  </form>
</div>