// Select all links in the servicios section
const links = document.querySelectorAll('#servicios ul li a h4');
const servicios = document.getElementById('servicios');

// Define the image paths for each link (provide your paths)
const imagePaths = [
    '../media/img/mockups/pink-1-mensaje.png',
    '../media/img/mockups/orange-1-safeoil-ig.png',
    '../media/img/mockups/pink-2-feed-ananda.png'
];

// Variable to track the active link
let activeIndex = -1;
let isAnimating = false; // Flag to track if an animation is currently running
let hoverDisabled = false; // Flag to disable hover effects during animations

// Function to change the background image of the ::after pseudo-element
function changeBackground(index) {
    if (hoverDisabled) return; // Prevent any new hover if it's disabled
    if (isAnimating) return; // Prevent any new animation if one is running
    isAnimating = true; // Set the flag to indicate an animation is starting

    // Remove the active class from all links
    links.forEach(link => {
        link.classList.remove('active'); // Remove 'active' class
        link.style.fontFamily = ''; // Reset font family
    });

    if (index >= 0) {
        // Set the background image on hover or click
        servicios.style.setProperty('--after-image', `url(${imagePaths[index]})`);
        // Add the active class to the current link
        links[index].classList.add('active'); // Add 'active' class
        links[index].style.fontFamily = 'var(--font-family-cursive)'; // Set font family for active link
    } else {
        // Reset to the default background image for the ::after pseudo-element
        servicios.style.setProperty('--after-image', 'url(../media/background/flores-naranjas.jpeg)');
    }

    // Disable hover effects during animation
    hoverDisabled = true;

    // Delay for the transition duration before allowing a new animation
    setTimeout(() => {
        isAnimating = false; // Reset the flag after the animation duration
        hoverDisabled = false; // Re-enable hover effects
    }, 300); // Match this duration with your CSS transition duration
}

// Set the default background image when the page loads
changeBackground(-1);

// Add event listeners for hover and click effects
links.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        if (activeIndex === index) return; // Prevent changing if it's already active
        changeBackground(index);
    });

    link.addEventListener('mouseleave', () => {
        if (activeIndex === index) return; // Prevent resetting if it's already active
    });

    // Handle click event
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (activeIndex === index) return; // Prevent re-triggering if already active
        activeIndex = index; // Update active index
        changeBackground(activeIndex); // Change background image
    });
});

// Optional: Click outside to reset the background
document.addEventListener('click', (event) => {
    if (!servicios.contains(event.target)) {
        activeIndex = -1; // Reset active index
        changeBackground(activeIndex); // Reset background image
    }
});
