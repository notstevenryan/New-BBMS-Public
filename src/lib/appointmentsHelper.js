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

  // Log the date to see what is being passed
  console.log('Selected Date:', selectedDate); // Debugging
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  // Fetch the session
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    alert('Please login to book an appointment.');
    return;
  }

  const userId = sessionData.session.user.id;

  // Fetch user profile details
  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, phone')
    .eq('id', userId)
    .single();

  if (profileError) {
    alert('Failed to retrieve user profile.');
    return;
  }

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
    // Begin transaction
    const { error: transactionError } = await supabase
      .from('user_appointments') // Insert directly into user_appointments
      .insert([
        {
          user_id: userId,
          display_name: userProfile.display_name,
          phone: userProfile.phone,
          date: selectedDate,
          location: selectedLocation,
          time_slot: selectedTime,
          donation_type: donationType,  // Include donationType
          notes: notes || null          // Include notes
        }
      ]);

    if (transactionError) {
      console.error('Transaction error:', transactionError.message);
      alert('Failed to book the appointment. Please try again later.');
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

