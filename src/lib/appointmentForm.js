import { date, time, location, name, email, donationType, notes, locationDetails, errors } from './formStore.js';
import { onMount } from 'svelte';
import { submitAppointment, fetchLocations } from './formUtils.js';

export function initializeForm() {
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
    errors.set({ date: '', time: '', email: '' });

    let hasErrors = false;

    const currentDate = new Date();

    date.subscribe(d => {
      if (!d) {
        errors.update(e => ({ ...e, date: 'Date is required.' }));
        hasErrors = true;
      } else if (new Date(d) < currentDate) {
        errors.update(e => ({ ...e, date: 'Date cannot be in the past.' }));
        hasErrors = true;
      }
    });

    time.subscribe(t => {
      if (!t) {
        errors.update(e => ({ ...e, time: 'Time is required.' }));
        hasErrors = true;
      }
    });

    email.subscribe(e => {
      if (!e || !validateEmail(e)) {
        errors.update(e => ({ ...e, email: 'Please enter a valid email address.' }));
        hasErrors = true;
      }
    });

    if (hasErrors) return;

    const { success, message } = await submitAppointment({
      date, time, location, name, email, donationType, notes
    });

    if (success) {
      alert('Appointment booked successfully!');
      // Clear form
      date.set('');
      time.set('');
      location.set('');
      name.set('');
      email.set('');
      donationType.set('individual');
      notes.set('');
    } else {
      alert(`Error: ${message}`);
    }
  };

  const updateLocationDetails = () => {
    location.subscribe(loc => {
      const selectedLocation = locations.find(loc => loc.name === loc);
      locationDetails.set(selectedLocation ? selectedLocation.address : '');
    });
  };

  onMount(async () => {
    const { locations: fetchedLocations, message } = await fetchLocations();
    if (fetchedLocations.length > 0) {
      locations.set(fetchedLocations);
    } else {
      console.error('Error fetching locations:', message);
    }
  });

  return {
    timeOptions,
    handleSubmit,
    updateLocationDetails
  };
}
