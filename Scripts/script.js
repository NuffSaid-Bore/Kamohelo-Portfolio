const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.section');

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
