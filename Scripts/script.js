const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menuList");
const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const scrollers = document.querySelectorAll(".scroller");
const openForm = document.getElementById('openForm');
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');


menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove active class from all links and sections
        menuLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to the clicked link and corresponding section
        link.classList.add('active');
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
    });
});


hamburger.addEventListener("click", function() {
    // Toggle the active class to show/hide the menu
    menu.classList.toggle("hidden");
    document.querySelector('.menu').classList.toggle('active'); // Toggle active class
    document.querySelector('.container').classList.toggle('hamburger-visible');
    hamburger.classList.toggle('open');
});

var typed = new Typed(".multiple-text", {
    strings: ["Student", "Programmer", "Video Games Enthusiast", "Dreamer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* Adding eventlistener in filter buttons */

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all filter items
        filterItems.forEach(i => i.classList.remove('active'));
        // Add active class to the clicked filter item
        item.classList.add('active');

        const category = item.textContent;

        portfolioItems.forEach(portfolioItem => {
            const itemCategory = portfolioItem.querySelector('.item-category').textContent;

            // Show or hide items based on selected filter
            if (category === 'All' || itemCategory === category) {
                portfolioItem.classList.add('active');
            } else {
                portfolioItem.classList.remove('active');
            }
        });
    });
});

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
  
//  Contact form
document.addEventListener('DOMContentLoaded', function () {
    

    // Open the contact form
    openForm.addEventListener('click', function (event) {
        event.preventDefault();
        contactForm.classList.add('open');
    });

    // Close the form when clicking the close button
    closeForm.addEventListener('click', function () {
        contactForm.classList.remove('open');
    });

   // Close the form when clicking outside of it
    window.addEventListener('click', function (event) {
        // Check if the clicked target is outside the contact form
        if (!contactForm.contains(event.target) && event.target !== openForm) {
            contactForm.classList.remove('open'); // Close the form
        }
    });


});
