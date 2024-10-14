// Get the button element
const goUpBtn = document.getElementById('goUpBtn');

// Listen for scroll events
window.onscroll = function () {
    // Show the button when scrolled down 200px or more
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        goUpBtn.classList.add('show');
    } else {
        goUpBtn.classList.remove('show');
    }
};

// Scroll back to the top when the button is clicked
goUpBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
});

