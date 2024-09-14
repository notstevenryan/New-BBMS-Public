<style>

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    text-align: center;
    background-color: #f2f2f2;


    /* BORDER */
    border: 1px solid #ccc; /* Simple border with light gray color */
    padding: 10px; /* Optional: space inside the border */
    border-radius: 5px; /* Optional: rounded corners */  
  }

  .nav-buttons {
    margin-top: 20px;
  }
  
  .nav-buttons a {
    margin: 10px;
    padding: 10px 20px;
    background-color: #D50000;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .nav-buttons a:hover {
    background-color: #b71c1c;
  }
</style>


<!-- START APPOINTMENT BOOKING -->
    <h2 class="text">📅 Book an Appointment</h2>
    <div class="container" id= "appointment-booking">
        <div class="nav-buttons">
          <!-- Link to the appointment booking page -->
          <a href="/appointments/">Book an Appointment</a>
          <!-- Link to view existing appointments -->
          <!-- <a href="/appointments/view">View Appointments</a> -->
        </div>
    </div>
<!-- END APPOINTMENT BOOKING -->
