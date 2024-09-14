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