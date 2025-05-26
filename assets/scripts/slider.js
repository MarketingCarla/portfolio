const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');

let currentSlide = 0;
let slideInterval; // Variable to hold the interval ID
let autoPlayStarted = false; // To track if autoplay has been triggered

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    const offset = -index * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Create indicators dynamically based on the number of slides
function createIndicators() {
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.setAttribute('data-slide', index);
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetSlideInterval(); // Reset interval when an indicator is clicked
        });
        indicatorsContainer.appendChild(indicator);
    });
    // Set the first indicator as active
    indicators = document.querySelectorAll('.indicator'); // Fetch the indicators after creating them
    indicators[0].classList.add('active');
}

// Function to reset the slide interval
function resetSlideInterval() {
    clearInterval(slideInterval); // Clear the existing interval
    startSlideInterval(); // Start a new interval
}

// Function to start the automatic slide change interval
function startSlideInterval() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }, 4000); // Change slide every 5 seconds
}

// Function to check if the first slide is in view
function isFirstSlideInView() {
    const firstSlide = slides[0];
    const rect = firstSlide.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Event listener to detect when the first slide comes into view
window.addEventListener('scroll', () => {
    if (!autoPlayStarted && isFirstSlideInView()) {
        startSlideInterval(); // Start autoplay when the first slide is in view
        autoPlayStarted = true; // Ensure this only runs once
    }
});

// Previous slide button event
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
    resetSlideInterval(); // Reset interval when navigating manually
});

// Next slide button event
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
    resetSlideInterval(); // Reset interval when navigating manually
});

// Create indicators and show the first slide on page load
createIndicators();
showSlide(currentSlide);
