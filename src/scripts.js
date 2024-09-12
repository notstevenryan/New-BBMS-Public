// START Bloodbank locator

const bloodBankData = [

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
  
  export function initMap() {
    const myLatLng = { lat: 14.602299563459118, lng: 121.03637304460855 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: myLatLng,
    });
  
    // Markers V.1
    bloodBankData.forEach((bloodBank) => {
      new google.maps.Marker({
        position: { lat: bloodBank.lat, lng: bloodBank.lng },
        map: map,
        title: bloodBank.name,
      });
    });
  
    const bloodBankListItems = document.getElementById("bloodbank-list-items");
  
    bloodBankData.forEach((bloodBank, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${bloodBank.name}</strong><br>${bloodBank.address}<br>${bloodBank.contactnum}<br>${bloodBank.email}`;
      listItem.classList.add("mapList");
  
      // When a blood bank is clicked, pan to its location on the map.
      listItem.addEventListener("click", () => {
        map.panTo({ lat: bloodBank.lat, lng: bloodBank.lng });
        map.setZoom(15);
      });
  
      bloodBankListItems.appendChild(listItem);
    });
  }
  
  export function webMap() {
    window.initMap = initMap;
  }
  
  // END Bloodbank Locator
  
  // START Appointment booking
  
    // src/routes/appointments/+server.js
    import { getAppointments, addAppointment } from '$lib/db';
  
    // GET: Return all appointments
    export const GET = async () => {
        return new Response(JSON.stringify(getAppointments()), { status: 200 });
    };
  
    // POST: Add a new appointment
    export const POST = async ({ request }) => {
        const { name, email, appointment_time } = await request.json();
        addAppointment({ name, email, appointment_time });
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    };
  
  // END Appointment booking