import { writable } from 'svelte/store';

// Define writable stores for form fields
export const date = writable('');
export const time = writable('');
export const location = writable('');
export const name = writable('');
export const email = writable('');
export const donationType = writable('individual');
export const notes = writable('');
export const locationDetails = writable('');
export const errors = writable({
  date: '',
  time: '',
  email: '',
});
