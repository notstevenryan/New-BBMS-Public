<script>
    let date = '';
    let time = '';
    let location = '';
    let appointmentList = [];
  
    const timeOptions = [
      "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
  
    const locations = ["Location A", "Location B", "Location C"];
  
    const bookAppointment = (e) => {
      e.preventDefault();
  
      if (!date || !time || !location) {
        alert('Please fill all fields.');
        return;
      }
  
      appointmentList = [
        ...appointmentList,
        { date, time, location }
      ];
  
      alert('Appointment booked successfully!');
      
      // Clear form
      date = '';
      time = '';
      location = '';
    };
</script>
  
<style>
    /* Basic form styling */
    form {
      max-width: 600px;
      margin: 1rem auto;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 8px;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input, select {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .appointment-list {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .appointment-list div {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
    }
</style>

<main>

  <h2>Dashboard</h2>
  
  <!-- Booking Form -->
  <form on:submit={bookAppointment}>
    <div>
      <label for="date">Date:</label>
      <input type="date" id="date" bind:value={date} required />
    </div>
  
    <div>
      <label for="time">Time:</label>
      <select id="time" bind:value={time}>
        <option value="">Select time</option>
        {#each timeOptions as timeOption}
          <option value={timeOption}>{timeOption}</option>
        {/each}
      </select>
    </div>
  
    <div>
      <label for="location">Location:</label>
      <select id="location" bind:value={location}>
        <option value="">Select location</option>
        {#each locations as loc}
          <option value={loc}>{loc}</option>
        {/each}
      </select>
    </div>
  
    <button type="submit">Book Appointment</button>
  </form>
  
  <!-- Appointment List -->
  <div class="appointment-list">
    <h3>Your Appointments</h3>
    {#if appointmentList.length > 0}
      {#each appointmentList as appointment}
        <div>
          <strong>Date:</strong> {appointment.date} <br>
          <strong>Time:</strong> {appointment.time} <br>
          <strong>Location:</strong> {appointment.location}
        </div>
      {/each}
    {:else}
      <p>No appointments booked yet.</p>
    {/if}
  </div>
</main>
