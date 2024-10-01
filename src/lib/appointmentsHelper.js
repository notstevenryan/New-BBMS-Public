// src/lib/appointmentsHelper.js

import { supabase } from '$lib/supabase.js';

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

// Handle appointment booking
export const bookAppointment = async (e, selectedDate, selectedLocation, selectedTime, availability, donationType, notes) => {
  e.preventDefault(); // Prevent default behavior

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData?.session) {
    alert('Please login to book an appointment.');
    return;
  }

  const userId = sessionData.session.user.id;
  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, phone')
    .eq('id', userId)
    .single();

  if (profileError) {
    alert('Failed to retrieve user profile.');
    return;
  }

  if (!selectedDate || !selectedLocation || !selectedTime || !donationType) {
    alert('Please fill all fields.');
    return;
  }

  if (availability[selectedTime] === 0) {
    alert('No available slots for the selected time.');
    return;
  }

  try {
    // Begin transaction to insert the appointment and update availability
    const { error: transactionError } = await supabase
      .from('user_appointments')
      .insert([{
        user_id: userId,
        display_name: userProfile.display_name,
        phone: userProfile.phone,
        date: selectedDate,
        location: selectedLocation,
        time_slot: selectedTime,
        donation_type: donationType,
        notes: notes || null
      }]);

    if (transactionError) {
      console.error('Transaction error:', transactionError.message);
      alert('Failed to book the appointment. Please try again later.');
      return;
    }

    // Update available slots in appointment_slots table
    const { error: updateError } = await supabase
      .from('appointment_slots')
      .update({ available_slots: availability[selectedTime] - 1 }) // Decrease by 1
      .eq('date', selectedDate)
      .eq('location', selectedLocation)
      .eq('time_slot', selectedTime);

    if (updateError) {
      console.error('Error updating available slots:', updateError.message);
      await supabase.from('user_appointments').delete().match({ user_id: userId, date: selectedDate, location: selectedLocation, time_slot: selectedTime });
      alert('Failed to update available slots. Appointment booking rolled back.');
    } else {
      availability[selectedTime] -= 1; // Decrease local availability count
      alert('Appointment booked successfully!');
    }
  } catch (error) {
    console.error('Error booking appointment:', error.message);
    alert('An unexpected error occurred. Please try again later.');
  }
};


