<script>
  // You can add any shared logic here, like user authentication or fetching global data
  // Bootstrap JS for interactive components ex: dropdowns
  import Footer from './components/Footer.svelte';

  function smoothScroll(selector, event) {
  event.preventDefault(); // Prevent the default anchor behavior

  if (selector === "#home") {
    // Navigate to the root ("/") and scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
  else {
    // Smooth scroll to the specified element
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }



</script>
  
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

    .navbar .navbar-brand {
      margin-right: 1rem;
    }

    .navbar-toggler {
      border: none;
    }

    .navbar-nav {
      display: flex;
      flex-direction: row;
    }

    .nav-item {
      margin: 0 0.5rem; /* Space between nav items */
    }

    .nav-link {
      color: #fff;
      padding: 0.5rem 1rem; /* Padding inside each link */
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1); /* Hover effect */
    }

    .navbar-collapse {
      display: flex;
      justify-content: center;
    }

    main {
      padding: 2rem;
      min-height: calc(100vh - 120px); /* Ensures footer sticks to the bottom */
      background-color: #dcdcdc;
    }

</style>

<header class="header">
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">
      <a class="navbar-brand" href="#home" on:click={(e) => smoothScroll("#home", e)}>
        B.B.M.S <i class="fa-solid fa-droplet"></i>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link nav-hover text-light"
            href="/"
            on:click={(e) => smoothScroll("#home", e)}
            >
            Home
            </a>
          
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#news" on:click={(e) => smoothScroll("#news", e)}>News</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#appointment" on:click={(e) => smoothScroll("#appointment", e)}>Book an Appointment</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#bloodbank-locator" on:click={(e) => smoothScroll("#bloodbank-locator", e)}>Blood Bank Locator</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
  
<main>
    <!-- This slot will render the content of the current page -->
    <slot />
</main>
  
<Footer /> 

  