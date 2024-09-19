<script>
  // You can add any shared logic here, like user authentication or fetching global data
  // Bootstrap JS for interactive components ex: dropdowns
  import Footer from './components/Footer.svelte';
  import { smoothScroll } from '$lib/smoothscroll.js';

</script>

<header class="header">
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">

      <div class="container">
        <a class="nav-link nav-hover text-light"
          href="/">
          Home
        </a>
      </div>


      <a class="nav-link" href="#appointment" 
      on:click={(e) => smoothScroll("#appointment", e)}>
      Book an Appointment</a>
    </div>
  </nav>
  <br>
</header>
  
<main>
  <br>
    <!-- This slot will render the content of the current page -->
    <slot />
</main>
  
<Footer />

<style>  
  header {
    background-color: #D50000;
    color: white;
    text-align: center;
    width: 100%;
  }


  /* Navbar styles */
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .nav-link {
    color: #fff;
    padding: 0.5rem 1rem; /* Padding inside each link */
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Hover effect */
  }

  main {
    padding: 3rem;
    min-height: calc(100vh - 120px); /* Ensures footer sticks to the bottom */
    background-color: #dcdcdc;
  }

  /* Sidebar styling */
  .sidebar {
    height: 100%; /* Full height */
    width: 0; /* Hidden by default */
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    background-color: #dc3545; /* Dark background */
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s; /* Animation */
    padding-top: 60px; /* Padding from top */
  }

  .sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #fff;
    display: block;
    transition: 0.3s;
  }

  .sidebar a:hover {
    color: #f1f1f1;
  }

  .open-sidebar-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 30px;
    cursor: pointer;
  }

</style>

  