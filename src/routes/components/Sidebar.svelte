<script>
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
    <div class="sidebar" id="homepage-sidebar">
        <a href="#home" on:click={(e) => smoothScroll("#home", e)}>🏠 Home</a>
        <a href="#news" on:click={(e) => smoothScroll("#news", e)}>📰 News</a>
        <a href="#bloodbank-locator" on:click={(e) => smoothScroll
        ("#bloodbank-locator", e)}>📍 Blood Bank Locator</a>
    </div>

    <!-- Button to open the sidebar -->
    <button 
        class="open-sidebar-btn bg-danger" 
        on:click={() => toggleSidebar()}>
        ☰
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
    bottom: 100px;
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