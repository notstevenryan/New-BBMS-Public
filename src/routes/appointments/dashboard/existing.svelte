<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';

  let appointments = [];
  let filteredAppointments = [];
  let sortField = 'date'; // Default sort field
  let sortOrder = 'asc';  // Default sort order
  let statusFilter = '';   // Status filter value

  // Fetch appointments on mount
  onMount(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      alert('Please login to view your appointments.');
      return;
    }

    const userId = sessionData.session.user.id;

    const { data, error } = await supabase
      .from('user_appointments')
      .select('date, display_name, phone, location, time_slot, status')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching appointments:', error.message);
      return;
    }

    appointments = data;
    filteredAppointments = data;
    sortAppointments('date'); // Sort by date initially
  });

  // Sorting function
  const sortAppointments = (field) => {
    sortOrder = (sortField === field) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    sortField = field;

    filteredAppointments.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (field === 'date') {
        return sortOrder === 'desc' ? dateA - dateB : dateB - dateA;
      }
      return (a[field] < b[field] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
    });
  };

  // Cancel appointment function
  const cancelAppointment = async (appointment) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      alert("Failed to cancel the appointment: no user session found.");
      return;
    }

    console.log('Attempting to cancel appointment:', appointment);

    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('user_appointments')
      .update({ status: 'canceled' })
      .eq('user_id', userId)
      .eq('date', formattedDate)
      .eq('location', appointment.location)
      .eq('time_slot', appointment.time_slot);

    if (error) {
      alert('Failed to cancel the appointment.');
      console.error('Error cancelling appointment:', error.message);
      } 
    else {
      alert('Appointment canceled successfully!');
      // Update the local state
      filteredAppointments = filteredAppointments.map(app =>
        app.date === appointment.date && app.location === appointment.location && app.time_slot === appointment.time_slot
          ? { ...app, status: 'canceled' }
          : app
      );
    }
  };

  // Filter by status
  const filterByStatus = () => {
    filteredAppointments = statusFilter
      ? appointments.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase())
      : appointments;

    sortAppointments(sortField); // Re-sort after filtering
  };
</script>

<main>
  <h2>🗓️ Your Appointments</h2>

  <!-- Status Filter -->
  <div class="filter-group">
    <label for="status-filter">Filter by Status:</label>
    <select id="status-filter" bind:value={statusFilter} on:change={filterByStatus}>
      <option value="">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
      <option value="canceled">Canceled</option>
    </select>
  </div>

  <!-- Scrollable table container -->
  <div class="table-container">
    {#if filteredAppointments.length > 0}
      <table class="appointments-table">
        <thead>
          <tr>
            <th on:click={() => sortAppointments('date')}>Date {sortField === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th on:click={() => sortAppointments('display_name')}>Name {sortField === 'display_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th on:click={() => sortAppointments('phone')}>Phone {sortField === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th on:click={() => sortAppointments('location')}>Location {sortField === 'location' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th on:click={() => sortAppointments('time_slot')}>Time Slot {sortField === 'time_slot' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th on:click={() => sortAppointments('status')}>Status {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredAppointments as appointment}
            <tr>
              <td>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td>{appointment.display_name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.location}</td>
              <td>{appointment.time_slot}</td>
              <td class="status-{appointment.status.toLowerCase()}">{appointment.status}</td>
              <td>
                {#if appointment.status !== 'canceled' && appointment.status !== 'completed'}
                  <button on:click={() => cancelAppointment(appointment)}>Cancel</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>No appointments found.</p>
    {/if}
  </div>
</main>

<style>
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  /* Container for the scrollable table */
  .table-container {
    max-height: 400px; /* Adjust this height as needed */
    overflow-y: auto;
    margin: 20px 0;
  }

  table.appointments-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    cursor: pointer;
  }

  table.appointments-table th,
  table.appointments-table td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
  }

  table.appointments-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  table.appointments-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  table.appointments-table tr:hover {
    background-color: #f1f1f1;
  }

  table.appointments-table td {
    color: #555;
  }

  .filter-group {
    margin-bottom: 20px;
    text-align: center;
  }

  table.appointments-table td.status-completed {
    color: #28a745;
    font-weight: bold;
  }

  table.appointments-table td.status-pending {
    color: #ffc107;
    font-weight: bold;
  }

  table.appointments-table td.status-canceled {
    color: #dc3545;
    font-weight: bold;
  }

  p {
    text-align: center;
    color: #666;
  }

  button {
    background-color: #dc3545;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #c82333;
  }
</style>
