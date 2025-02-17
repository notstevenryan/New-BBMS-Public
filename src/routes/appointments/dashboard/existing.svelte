<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';

  let appointments = [];
  let filteredAppointments = [];
  let paginatedAppointments = [];
  let sortField = 'date';
  let sortOrder = 'asc';
  let statusFilter = '';
  let currentPage = 1;
  const itemsPerPage = 5;

  onMount(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      alert('Please login to view your appointments.');
      return;
    }

    const userId = sessionData.session.user.id;
    const { data, error } = await supabase
      .from('user_appointments')
      .select('date, display_name, location, time_slot, status')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching appointments:', error.message);
      return;
    }

    appointments = data || []; // Ensure it's always an array
    filterByStatus(); // Apply initial filtering and sorting
  });

  const sortAppointments = (field) => {
    sortOrder = (sortField === field) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    sortField = field;

    filteredAppointments.sort((a, b) => {
      if (field === 'date') {
        return (new Date(a.date) - new Date(b.date)) * (sortOrder === 'asc' ? 1 : -1);
      }
      return a[field].toLowerCase().localeCompare(b[field].toLowerCase()) * (sortOrder === 'asc' ? 1 : -1);
    });
  };

  const filterByStatus = () => {
    filteredAppointments = statusFilter
      ? appointments.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase())
      : [...appointments];

    sortAppointments(sortField); // Ensure sorting is applied after filtering
  };

  // Reactive statements
  $: totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  $: paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) currentPage++;
  };

  const prevPage = () => {
    if (currentPage > 1) currentPage--;
  };
</script>

<main>
  <h2>🗓️ Your Appointments</h2>
  
  <div class="filter-group">
    <label for="status-filter">Filter by Status:</label>
    <select id="status-filter" bind:value={statusFilter} on:change={filterByStatus}>
      <option value="">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
      <option value="canceled">Canceled</option>
    </select>
  </div>

  <div class="table-container">
    {#if paginatedAppointments.length > 0}
      <table class="appointments-table">
        <thead>
          <tr>
            <th on:click={() => sortAppointments('date')}>Date</th>
            <th on:click={() => sortAppointments('display_name')}>Name</th>
            <th on:click={() => sortAppointments('location')}>Location</th>
            <th on:click={() => sortAppointments('time_slot')}>Time Slot</th>
            <th on:click={() => sortAppointments('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each paginatedAppointments as appointment}
            <tr>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.display_name}</td>
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

  <div class="pagination">
    <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
  </div>
</main>

<style>
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .table-container {
    max-height: 400px;
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