<script>
  import { smoothScroll } from '$lib/smoothscroll.js';
  
  let sidebarVisible = false;

  export const toggleSidebar = () => {
    const sidebar = document.getElementById('homepage-sidebar');
    if (sidebarVisible) {
      sidebar.style.width = "0";
    } else {
      sidebar.style.width = "200px";
    }
    sidebarVisible = !sidebarVisible;
  };
</script>

<main>
    <!-- Sidebar structure for homepage only -->
    <div class="sidebar bg-dark" id="homepage-sidebar">
      <a href="#home" 
        on:click={(e) => smoothScroll("#home", e)}>
        🏠 Home
      </a>
      <a href="#news" 
        on:click={(e) => smoothScroll("#news", e)}>
        📰 News
      </a>
      <a href="#bloodbank-locator" 
        on:click={(e) => smoothScroll("#bloodbank-locator", e)}>
        📍 Blood Bank Locator
      </a>
      <a href="#appointment" 
        on:click={(e) => smoothScroll("#appointment", e)}>
        📅 Book an Appointment
      </a>
    </div>

    <!-- Button to open the sidebar -->
    <button 
        class="open-sidebar-btn bg-danger text-white" 
        on:click={() => toggleSidebar()}>
        ☰ Navigation
    </button>

    <button class="navbar-toggler" 
        type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</main>

<style>
  /* Sidebar styling */
  .sidebar {
    height: 100%; /* Full height */
    width: 0; /* Hidden by default */
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.25s; /* Smooth width transition */
    z-index: 1000; /* Make sure it stays on top */
    padding-top: 110px; /* Adjust the top padding */

  }

  .sidebar a {
    padding: 20px 8px 8px 32px; /* Adjust the top padding to your preference */
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    display: block;
    transition: color 0.3s;
    border: 1px;
  }

  .sidebar a:hover {
    color: #f1f1f1;
  }

  .open-sidebar-btn {
    position: fixed;
    top: 70px;
    left: 10px;
    font-size: 18px;
    cursor: pointer;
    z-index: 1100; /* Make sure the button is always visible */
    border-color: #ddd;
    border-radius: 5px;
  }

  /* Content won't move up when sidebar opens */
  main {
    margin-left: 0;
    transition: margin-left 0.25s; /* Optional: transition for content */
  }

</style>
