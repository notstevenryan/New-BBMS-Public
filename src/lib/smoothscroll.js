// src/lib/smoothScroll.js

export function smoothScroll(selector, event) {
    event.preventDefault(); // Prevent the default anchor behavior
  
    if (selector === "#home") {
      // Navigate to the root ("/") and scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Smooth scroll to the specified element
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  