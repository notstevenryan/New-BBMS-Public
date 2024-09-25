<script>
  import Booking from './booking.svelte';
	import Existing from './existing.svelte';

</script>

<main>
  <div class="container-flex bg-light" id="greeting">
    <h1>Donor Dashboard</h1>
    <p>Welcome to your dashboard. You can book a new appointment or view your existing ones.</p>
  </div>

  <br>
  <Booking />
  <Existing />
</main>

<style>

  #greeting {
    padding: 20px; /* Optional: Add some space inside the border */
    border-radius: 5px; /* Optional: Add rounded corners */
    text-align: center;
  }

</style>
