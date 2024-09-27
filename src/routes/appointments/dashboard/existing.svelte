<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';

  let appointments = [];

  onMount(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      alert('Please login to view your appointments.');
      return;
    }

    const userId = sessionData.session.user.id;

    let { data, error } = await supabase
      .from('user_appointments')
      .select('date, display_name, phone, location, time_slot, status')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching appointments:', error.message);
    } else {
      appointments = data;
    }
  });
</script>

<main>
  <h2>🗓️ Your Appointments</h2>

  <div class="container-flex">
    {#if appointments.length > 0}
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Display Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Time Slot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each appointments as appointment}
            <tr>
              <td>{appointment.date}</td>
              <td>{appointment.display_name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.location}</td>
              <td>{appointment.time_slot}</td>
              <td class="status-{appointment.status.toLowerCase()}">
                {appointment.status}
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

  table.appointments-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
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
</style>
