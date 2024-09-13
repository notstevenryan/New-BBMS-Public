<!-- src/routes/appointments/+page.svelte -->
<script>
    let name = '';
    let email = '';
    let appointment_time = '';
  
    async function bookAppointment() {
      const res = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, appointment_time })
      });
  
      if (res.ok) {
        alert('Appointment booked successfully!');
      }
    }

    let appointments = [];
        async function loadAppointments() {
        const res = await fetch('/appointments');
        if (res.ok) {
            appointments = await res.json();
            }
        }
        loadAppointments();
</script>

<style>
  
</style>

<html lang="en">
  <head>
  </head>

  <body>
    <main>
      <h1> TITE </h1>
    </main>
  </body>

  <footer>
  </footer>
</html>