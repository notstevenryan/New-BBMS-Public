<script>
    import { onMount } from "svelte";
    import img1 from '$lib/1.png';
    import img2 from '$lib/2.png';
    import img3 from '$lib/3.png';
  
    let currentSlide = 0;
    let interval;
    let images = [
      { src: img1, alt: "Slide 1" },
      { src: img2, alt: "Slide 2" },
      { src: img3, alt: "Slide 3" }
    ];
  
    // Function to auto-slide
    onMount(() => {
      interval = setInterval(nextSlide, 9000); // Auto-slide every 3 seconds
      return () => clearInterval(interval); // Clear interval on unmount
    });
  
    // Function to move to the next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % images.length;
    }
  
    // Function to move to the previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
    }
  </script>
  
  <style>
    .carousel-container {
      position: relative;
      width: 100%;
      max-width: 100vw; /* Full width */
      margin: auto;
      overflow: hidden; /* Hide overflowing images */
    }
  
    .carousel-slides {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }
  
    .carousel-slide {
      flex: 0 0 100%; /* Ensure each slide takes up 100% width */
      box-sizing: border-box;
    }
  
    .carousel-slide img {
      width: 100%;
      height: auto; /* Maintain aspect ratio */
      display: block;
    }
  
    .carousel-controls {
      position: absolute;
      top: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
    }
  
    .carousel-control {
      background: rgba(0, 0, 0, 0.7);
      border: none;
      color: white;
      font-size: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%; /* Make the button circular */
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background 0.3s ease;
    }
  
    .carousel-control-prev {
      left: 10px;
    }
  
    .carousel-control-next {
      right: 10px;
    }
  
    .carousel-control:hover {
      background: rgba(0, 0, 0, 0.9); /* Darker on hover */
    }
  </style>
  
  <div class="carousel-container">
    <div class="carousel-slides" style="transform: translateX({-currentSlide * 100}%)">
      {#each images as image}
        <div class="carousel-slide">
          <img src={image.src} alt={image.alt} />
        </div>
      {/each}
    </div>
    <div class="carousel-controls">
      <button class="carousel-control carousel-control-prev" on:click={prevSlide}>‹</button>
      <button class="carousel-control carousel-control-next" on:click={nextSlide}>›</button>
    </div>
  </div>