import './About/about.js';
import './Contact/contact.js';
import './Chatbot/chatbot.js'

const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menuList");



// Get the current year and set it in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

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


