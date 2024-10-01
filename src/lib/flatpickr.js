import flatpickr from 'flatpickr';

// Initialize Flatpickr
export const initializeFlatpickr = (onDateSelect) => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to tomorrow

  return flatpickr('#date-picker', {
    inline: true,
    dateFormat: 'Y-m-d', // Ensure the date format is correctly set
    minDate: today.toISOString().split('T')[0],
    maxDate: new Date().fp_incr(30),
    onChange: onDateSelect,
    weekNumbers: true,
    enableTime: false, // Disable time selection
    });
};
