const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menuList");
const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');


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



