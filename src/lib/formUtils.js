import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://xqvmniexqhrpvtnxuzwt.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxdm1uaWV4cWhycHZ0bnh1end0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzIyMDAsImV4cCI6MjA0MTYwODIwMH0.ZU-YEJcPPuMkJ8jAe6_wsh5rFjHc15wl5Am4ZC6Zmac'; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to submit the appointment form
export async function submitAppointment({ date, time, location, name, email, donationType, notes }) {
  try {
    const { error } = await supabase
      .from('appointments')
      .insert([
        { date, time, location, name, email, donation_type: donationType, notes }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting appointment:', error);
    return { success: false, message: error.message };
  }
}

// Function to fetch locations from Supabase
export async function fetchLocations() {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('name, address');

    if (error) {
      throw new Error(error.message);
    }

    return { locations: data };
  } catch (error) {
    console.error('Error fetching locations:', error);
    return { locations: [], message: error.message };
  }
}

// src/lib/formUtils.js
export async function fetchAvailableSlots(date) {
  try {
    const response = await fetch(`/api/slots?date=${date}`);
    if (!response.ok) {
      throw new Error(`Error fetching slots: ${response.statusText}`);
    }
    const data = await response.json();
    return { slots: data.slots };
  } catch (error) {
    console.error('Fetch available slots error:', error);
    return { slots: [], message: error.message };
  }
}


export async function submitAppointment(appointment) {
  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: data.success, message: data.message };
    } else {
      throw new Error('Error booking appointment');
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: error.message };
  }
}
