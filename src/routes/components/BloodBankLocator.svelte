<script>
    import { onMount } from 'svelte';
  
    // Bloodbank data
    const bloodBankList = [
        { name: "Veterans Memorial Medical Center",
            lat: 14.6560497,
            lng: 121.0400135,
            address: "North Ave, Diliman, Quezon City, Metro Manila",
            contactnum: "Tel: (02) 8927-6426",
            email: "" },

        { name: "NATIONAL BLOOD CENTER (PRC TOWER)",
            lat: 14.5719818,
            lng: 121.046633,
            address: "37 Epifanio de los Santos Ave, Mandaluyong, 1550 Metro Manila",
            contactnum: "Tel: (02) 790-2300 / (02) 790-2382 / (02) 790-2383",
            email: "" },

        { name: "NATIONAL BLOOD CENTER (MANILA)",
            lat: 14.5878723,
            lng: 120.9689759,
            address: "Bonifacio Drive, Port Area, Manila",
            contactnum: "Tel: (02) 527-0861 - ",
            email: "Email: nbc@redcross.org.ph; christine.lanorio@redcross.org.ph"  },

        { name: "Caloocan City",
            lat: 14.6472031,
            lng: 120.9918658,
            address: "114 7th Ave, Grace Park East, Caloocan, 1403 Metro Manila",
            contactnum: "Tel: 02-3660380",
            email: "Email: caloocan@redcross.org.ph"  },

        { name: "Makati City",
            lat: 14.5561906,
            lng: 121.0034496,
            address: "55B Johnny Air building Dian st, Corner Sen. Gil J. Puyat Ave, Makati, Metro Manila",
            contactnum: "Tel: 403-6267 / Mobile: 0917-148-9419",
            email: "Email: rizalmakati@redcross.org.ph" },

        { name: "Muntinlupa City",
            lat: 14.4142464,
            lng: 121.0445581,
            address: "Red Cross Center Centennial Lane, Filinvest Corporate City, Alabang, Muntinlupa",
            contactnum: "Tel: 850-6813 / Mobile: 0917-838-7672",
            email: "Email: rizalmuntinlupa@redcross.org.ph" },

        { name: "Pasay City",
            lat: 14.5308137,
            lng: 121.0039253,
            address: "2354 CAA Compound, Aurora Blvd. (old Tramo), Pasay City",
            contactnum: "Staff Agnes: 0918-917-1181 / 0917-815-1178",
            email: "Email: pasay@redcross.org.ph" },

        { name: "Quezon City",
            lat: 14.6353606,
            lng: 121.0473315,
            address: "53 Malakas St, Diliman, Quezon City, Metro Manila",
            contactnum: "Tel: 433-6568 / 433-2152 / 433-2151 / 435-0238 / 434-3751",
            email: "Email: quezoncity@redcross.org.ph" },

        { name: "Rizal - Main",
            lat: 14.5747847,
            lng: 121.0607356,
            address: "Bldg 611, PRC, Shaw Blvd, Pasig, 1603 Metro Manila",
            contactnum: "Tel: 631-3993",
            email: "Email: rizal@redcross.org.ph" },

        { name: "Rizal - East",
            lat: 14.5411116,
            lng: 121.1432423,
            address: "2nd Floor Multipurpose Bldg, Brgy Muzon, Taytay, Rizal",
            contactnum: "Tel: 998-4867 / Mobile: 0917-837-3805",
            email: "Email: prcrizalprovince@redcross.org.ph" },

        { name: "Valenzuela City",
            lat: 14.6933534,
            lng: 120.9687491,
            address: "ALERT Compound, Malinta, Valenzuela, 1440, Metro Manila",
            contactnum: "Tel: 432-0273 / 293-8375 / 456-7767 / Staff- Emy: 0919-466-8799",
            email: "Email: valenzuela2@redcross.org.ph" },

            // Add more blood bank locations
    ];
  
    // Initialize the map
    function initMap() {
        const myLatLng = { lat: 14.602299563459118, lng: 121.03637304460855 };
        const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: myLatLng,
        });
  
    // Add markers
    bloodBankList.forEach((bloodBank) => {
      new google.maps.Marker({
        position: { lat: bloodBank.lat, lng: bloodBank.lng },
        map: map,
        title: bloodBank.name,
      });
    });
  
    // Populate blood bank list
        const bloodBankListItems = document.getElementById("bloodbank-list-items");
        bloodBankList.forEach((bloodBank) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${bloodBank.name}</strong><br>${bloodBank.address}<br>${bloodBank.contactnum}<br>${bloodBank.email}`;
        listItem.classList.add("mapList");

    // Pan to marker when list item is clicked
        listItem.addEventListener("click", () => {
            map.panTo({ lat: bloodBank.lat, lng: bloodBank.lng });
            map.setZoom(15);
        });

        bloodBankListItems.appendChild(listItem);
        });
    }

    // Load the Google Maps API
    onMount(() => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9hnYtw84Sg78NaJjVw8qv0gkA2-IriC8&callback=initMap";
        script.defer = true;
        document.body.appendChild(script);

        // Set the global callback
        window.initMap = initMap;
    });
</script>
  
<style>
    #map {
        width: 100%;
        height: 100%;
        }

    .bloodbank-container {
        display: flex;
        flex-direction: row; /* Side by side layout */
        gap: 20px; /* Optional: space between list and map */
        justify-content: space-between; /* Optional: space the items apart */
        align-items: flex-start; /* Align items to the start of the container */
        background-color: #f5f5f5; /* Light gray background on hover */

        /* BORDER */
        border: 1px solid #ccc; /* Simple border with light gray color */
        padding: 10px; /* Optional: space inside the border */
        border-radius: 5px; /* Optional: rounded corners */   
        }

    #bloodbank-list {
        flex: 1; /* Adjust the width of the list */
        overflow-y: auto; /* Add scroll if the list is too long */
        max-height: 500px; /* Adjust based on your design */
        border-radius: 10px;
        padding: 10px;
        }
    ul {
        list-style: none;
        padding: 0;
        }

    /* START List Style*/ 
    :global(#bloodbank-list li) {
        border: 2px solid #ddd; /* Light border color */
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd; 
        border-radius: 5px;
        transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for hover effect */
        cursor: pointer;
    }

    :global(#bloodbank-list li:hover) {
        background-color: #ffffff; /* Light gray background on hover */
        border-color: #333; /* Darker border color on hover */    }
    /* END List Style */

    #map-container {
        flex: 1; /* Adjust the width of the list */
        height: 500px; /* Adjust based on your design */
        }

</style>

<br> <h2>📍Blood Banks Near You</h2> <br>
<div class="bloodbank-container">
    <div id="bloodbank-list">
      <ul id="bloodbank-list-items">
        <!-- Blood bank list items will be populated dynamically -->
      </ul>
    </div>
    <div id="map-container">
      <div id="map"></div>
    </div>
</div>
  
  