<script>
  import Booking from './booking.svelte';
  import Existing from './existing.svelte';
</script>

<main>
  <!-- Greeting Section -->
  <section id="greeting" class="greeting-section">
    <h1>Donor Dashboard</h1>
    <p>Welcome to your dashboard. You can book a new appointment or view your existing ones.</p>
  </section>

  <!-- Booking Section -->
  <section class="booking-section">
    <Booking />
  </section>

  <!-- Existing Appointments Section -->
  <section class="existing-section">
    <Existing />
  </section>
</main>

<style>
  /* Global Layout */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Greeting Section */
  #greeting {
    padding: 20px;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 2.5rem;
    color: #007bff;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }

  /* Booking Section */
  .booking-section {
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }

  /* Existing Appointments Section */
  .existing-section {
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
</style>
