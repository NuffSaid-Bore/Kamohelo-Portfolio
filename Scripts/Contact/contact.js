const openForm = document.getElementById('openForm');
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');

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