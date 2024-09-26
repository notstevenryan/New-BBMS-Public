// src/lib/appointmentsHelper.js

import { supabase } from '$lib/supabase.js';
import flatpickr from 'flatpickr';

// Holds availability for the selected date
export let availability = {};

// Fetch locations from Supabase
export const fetchLocations = async () => {
  let { data, error } = await supabase
    .from('locations')
    .select('name, address, contact_numbers, email');

  if (error) {
    console.error('Error fetching locations:', error.message);
    return [];
  } else {
    return data;
  }
};

// Fetch availability for the selected date and location
export const fetchAvailability = async (date, location) => {
  let { data, error } = await supabase
    .from('appointment_slots')
    .select('*')
    .eq('date', date)
    .eq('location', location);

  if (error) {
    console.error('Error fetching availability:', error.message);
    return { Morning: 0, Afternoon: 0, Evening: 0 };
  } else {
    let availability = { Morning: 0, Afternoon: 0, Evening: 0 };
    data.forEach(appointment => {
      availability[appointment.time_slot] = appointment.available_slots;
    });
    return availability;
  }
};

// Initialize Flatpickr
export const initializeFlatpickr = (onChangeCallback) => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to tomorrow

  return flatpickr('#date-picker', {
    inline: true,
    minDate: today.toISOString().split('T')[0],
    onChange: onChangeCallback
  });
};

// Handle appointment booking
export const bookAppointment = async (e, selectedDate, selectedLocation, selectedTime, availability, donationType, notes) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  // Fetch the session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    alert('Please login to book an appointment.');
    return;
  }

  const userId = session.user.id;

  // Validate input fields
  if (!selectedDate || !selectedLocation || !selectedTime || !donationType) {
    alert('Please fill all fields.');
    return;
  }

  // Check availability
  if (availability[selectedTime] === 0) {
    alert('No available slots for the selected time.');
    return;
  }

  try {
    // Insert booking into user_appointments
    const { error: bookingError } = await supabase
      .from('user_appointments')
      .insert([{
        user_id: userId,
        date: selectedDate,
        location: selectedLocation,
        time_slot: selectedTime,
        donation_type: donationType,
        notes: notes || null
      }]);

    if (bookingError) {
      console.error('Booking error:', bookingError.message);
      alert('Failed to book the appointment. Please try again later.');
      return;
    }

    // Fetch the current available slots
    const { data: slotData, error: slotError } = await supabase
      .from('appointment_slots')
      .select('available_slots')
      .eq('date', selectedDate)
      .eq('location', selectedLocation)
      .eq('time_slot', selectedTime)
      .single(); // Get a single record

    if (slotError || !slotData) {
      console.error('Error fetching available slots:', slotError?.message);
      alert('Failed to update availability. Please try again later.');
      return;
    }

    // Decrease the available slots by 1
    const updatedSlots = slotData.available_slots - 1;

    // Update available slots in appointment_slots
    const { error: updateError } = await supabase
      .from('appointment_slots')
      .update({ available_slots: updatedSlots })
      .eq('date', selectedDate)
      .eq('location', selectedLocation)
      .eq('time_slot', selectedTime);

    if (updateError) {
      console.error('Error updating available slots:', updateError.message);
      alert('Failed to update availability. Please try again later.');
    } else {
      // Update local availability count after booking
      availability[selectedTime] -= 1;
      alert('Appointment booked successfully!');
    }
  } catch (error) {
    console.error('Error booking appointment:', error.message);
    alert('An unexpected error occurred. Please try again later.');
  }
};

