<script>
  // You can add any shared logic here, like user authentication or fetching global data
  // Bootstrap JS for interactive components ex: dropdowns
  import Footer from './components/Footer.svelte';

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

</style>

  