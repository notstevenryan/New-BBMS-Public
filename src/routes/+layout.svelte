<script>
    // You can add any shared logic here, like user authentication or fetching global data
    // Bootstrap JS for interactive components ex: dropdowns
    

    //Style 
    const smoothScroll = (target, event) => {
        event.preventDefault();
        scrollTo(target);
    };

</script>
  
<style>  
    header {
      background-color: #D50000;
      color: white;
      text-align: center;
    }
  
    nav {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  
    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      background-color: #b71c1c;
      border-radius: 5px;
    }
  
    nav a:hover {
      background-color: #93000c;
    }
  
    main {
      padding: 2rem;
      min-height: calc(100vh - 120px); /* Ensures footer sticks to the bottom */
      background-color: #e9e9e9;
    }
  
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      position: relative;
      bottom: 0;
      width: 100%;
    }
</style>
  
<header class="vw-100">    
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-danger w-100">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="#home"
            on:click={(e) => smoothScroll("#home", e)}
          >
            B.B.M.S <i class="fa-solid fa-droplet"></i>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mb-2 mb-md-0">
              <li class="nav-item active">
                <a
                  class="nav-link nav-hover text-light"
                  href="#home"
                  on:click={(e) => smoothScroll("#home", e)}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link nav-hover text-light"
                  href="#news-panel"
                  on:click={(e) => smoothScroll("#news-panel", e)}
                >
                  News
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link nav-hover text-light"
                  href="#bank-locator"
                  on:click={(e) => smoothScroll("#bloodbank-locator", e)}
                >
                  Blood Bank Locator
                </a>
              </li>
              <!-- Add a new page link for the appointment scheduler -->
              <li class="nav-item">
                <a
                  class="nav-link nav-hover text-light"
                  href="#appointment-form"
                  on:click={(e) => smoothScroll("#appointment-form", e)}
                >
                  Book an Appointment
                </a>
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
    
<!-- FOOTER -->
<footer class="bg-danger text-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 
            style="font-weight:900;font-family:'Segoe UI', 
            Tahoma, Geneva, Verdana, sans-serif;
            font-style:italic"
            >
              Donate Now
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              doloribus repellendus hic. Aut neque error maxime laborum
              voluptate sed, cum eum non. Ipsum dolor placeat autem quia
              doloribus illo consectetur.
            </p>
          </div>
          <div class="col-md-3">
            <h5>Contact Us</h5>
            <p>Email: info@bloodbank.com</p>
            <p>Phone: 845-4064</p>
            <p>Address: 123 Blood Donation Street, Cityville</p>
          </div>
          <div class="col-md-3">
            <h5>Follow Us</h5>
            <ul class="list-inline">
              <li id="socmed" class="list-inline-item">
                <a
                  href="https://www.facebook.com"
                  class="text-light"
                  target="_blank"
                  ><i class="fa-brands fa-facebook" style="font-size: 40px;"
                  ></i></a
                >
              </li>
              <li id="socmed" class="list-inline-item">
                <a
                  href="https://www.x.com"
                  class="text-light fs-2"
                  target="_blank"
                  ><i class="fa-brands fa-twitter" style="font-size: 40px;"
                  ></i></a
                >
              </li>
              <li id="socmed" class="list-inline-item">
                <a
                  href="https://www.instagram.com"
                  class="text-light"
                  target="_blank"
                  ><i class="fa-brands fa-instagram" style="font-size: 40px;"
                  ></i></a
                >
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-4" />
      <p class="text-center">&copy; 2023 For Capstone Use Only.</p>
    </div>
</footer>
<!-- END FOOTER -->

  