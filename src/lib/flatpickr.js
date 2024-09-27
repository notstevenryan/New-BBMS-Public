import flatpickr from 'flatpickr';

// Initialize Flatpickr
export const initializeFlatpickr = (onChangeCallback) => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to tomorrow

  return flatpickr('#date-picker', {
    inline: true,
    minDate: today.toISOString().split('T')[0],
    onChange: onChangeCallback,
    dateFormat: 'Y-m-d', // Ensure the date format is correctly set
    time_24hr: true, // Optional: Use 24-hour time format
  });
};
