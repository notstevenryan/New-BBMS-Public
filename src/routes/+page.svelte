<script>
  /*  DO NOT TOUCH */
  import { onMount } from 'svelte';

  /* APPOINTMENTS */
  import Appointments from './components/Appointments.svelte';


  /*  BLOODBANK LOCATOR */
  import BloodBankLocator from './components/BloodBankLocator.svelte';

  onMount(() => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9hnYtw84Sg78NaJjVw8qv0gkA2-IriC8&callback=initMap";
    script.defer = true;
    document.head.appendChild(script);
  });

  /*  Bootstrap */    
</script>

<style>
  /* Add this CSS to ensure content is visible below the fixed header */
  main {
    padding-top: 100px; /* Adjust the value as needed; 56px is common for a Bootstrap navbar */
    }

  /* START Animations*/
    /*Tilt-Forward*/
      @keyframes tilt-in-fwd-tr {
        0% {
          transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px)
            skew(-35deg, 10deg);
          opacity: 0;
        }
        100% {
          transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
          opacity: 1;
        }
      }

      /*Roll-In-Blurred-Left*/
      @keyframes roll-in-blurred-left {
        0% {
          transform: translateX(-1000px) rotate(-720deg);
          filter: blur(50px);
          opacity: 0;
        }
        100% {
          transform: translateX(0) rotate(0deg);
          filter: blur(0);
          opacity: 1;
        }
      }

      /*Bounce-In-Top*/
      @keyframes bounce-in-top {
        0% {
          transform: translateY(-500px);
          animation-timing-function: ease-in;
          opacity: 0;
        }
        38% {
          transform: translateY(0);
          animation-timing-function: ease-out;
          opacity: 1;
        }
        55% {
          transform: translateY(-65px);
          animation-timing-function: ease-in;
        }
        72% {
          transform: translateY(0);
          animation-timing-function: ease-out;
        }
        81% {
          transform: translateY(-28px);
          animation-timing-function: ease-in;
        }
        90% {
          transform: translateY(0);
          animation-timing-function: ease-out;
        }
        95% {
          transform: translateY(-8px);
          animation-timing-function: ease-in;
        }
        100% {
          transform: translateY(0);
          animation-timing-function: ease-out;
        }
      }
  /* END Animations */
</style>

<head>
</head>

<body>
  
  <main>
    <!-- START Contentful news -->
    <div class="container-md">
      <hr class="featurette-divider" />
      <br>
      <h2> Latest News </h2>
    </div>
    <!-- END Contentful news -->

    <br>
    <!-- START Appointment Booking -->
        <div class="container-md">
          <Appointments />
        </div>
    <!-- END Appointment Booking -->

    <!-- START THE BLOOD BANK LOCATOR -->
      <div class="container-md">

        <BloodBankLocator />
      </div>
    <!-- END THE BLOOD BANK LOCATOR -->
    <!-- START Donation history -->
    <div class="container-md">
    <br>
      <h2> Donation History</h2> <br>
    </div>
    <!-- END Donation history -->
  </main>
</body>