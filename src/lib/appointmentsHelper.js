// src/lib/appointmentsHelper.js

import { supabase } from '$lib/supabase.js';
import flatpickr from 'flatpickr';

export let availability = {}; // Holds availability for the selected date

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
export const bookAppointment = async (e) => {
    e.preventDefault();
  
    const session = supabase.auth.session();
    if (!session) {
      alert('Please login to book an appointment.');
      return;
    }
  
    const userId = session.user.id;
  
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
      .insert({
        user_id: userId,  // Store user ID
        date: selectedDate,
        location: selectedLocation,
        time_slot: selectedTime,
        available_slots: availability[selectedTime] - 1,
      });
  
    if (error) {
      console.error('Error booking appointment:', error.message);
    } else {
      alert('Appointment booked successfully!');
      availability[selectedTime] -= 1;
    }
  };
  
