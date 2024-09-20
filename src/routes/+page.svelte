<script>
  /*  DO NOT TOUCH */
  import { onMount } from 'svelte';
  import Appointments from './components/Appointments.svelte';
  import BloodBankLocator from './components/BloodBankLocator.svelte';
  import Sidebar from './components/Sidebar.svelte';

  onMount(() => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9hnYtw84Sg78NaJjVw8qv0gkA2-IriC8&callback=initMap";
    script.defer = true;
    document.head.appendChild(script);
  });
  
</script>

<body>

  <main>

    <Sidebar/>
    <div id="main-title">
      <h1>Blood Bank Management System</h1>
    </div>

    <!-- START Contentful news -->
    <div class="container-md " 
      id="news" >
        <div style="
        padding: 20px; 
        border: 1px 
        solid #ccc;
        border-radius: 5px;"
        >
          <h2> 📰 Latest News </h2>
          tite
          puke
          burat
        </div>
 
    </div>
    <!-- END Contentful news -->
     

    <!-- START THE BLOOD BANK LOCATOR -->
    <div class="container-md" 
      id="bloodbank-locator"
      style="
      padding: 20px; ">
      <BloodBankLocator />
    </div>
    <!-- END THE BLOOD BANK LOCATOR -->

    <!-- START Donor Appointment Booking -->
    <div class="container-md" 
      id="appointment"
      style="
      padding: 20px;">
        <Appointments />
    </div>
    <!-- END Donor Appointment Booking -->

  </main>
 
</body>

<style>
  /* Add this CSS to ensure content is visible below the fixed header */
  main {
    padding-top: 24px;
    }

  #main-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

</style>