<!-- START APPOINTMENT BOOKING -->
<div class="container" id="appointment-booking">
  <h2 class="text">📅 Book an Appointment</h2>

  <p>Log in or create an account to easily 
    book appointments and manage your donations.
  </p>
  <div class="nav-buttons">
    <a href="/appointments/login" class="login">Login</a>
    <a href="/appointments/signup" class="signup">Sign Up</a>
  </div>
</div>

<!-- END APPOINTMENT BOOKING -->

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
    text-align: center;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }

  .nav-buttons {
    margin-top: 20px;
  }

  .nav-buttons a {
    margin: 10px;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .nav-buttons a.login {
    background-color: #D50000;
  }

  .nav-buttons a.login:hover {
    background-color: #b71c1c;
  }

  .nav-buttons a.signup {
    background-color: #4CAF50;
  }

  .nav-buttons a.signup:hover {
    background-color: #45a049;
  }

</style>
