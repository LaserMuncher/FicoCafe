// JavaScript for carousel functionality
const carousel = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const buttons = document.querySelectorAll('.carousel-button');
let index = 0;
const images = carousel.querySelectorAll('img');
let autoSlideInterval;

function showImage(n) {
    index = (n + images.length) % images.length;
    carousel.style.transform = `translateX(${-index * 100}%)`;
    updateButtons();
}

function updateButtons() {
    buttons.forEach((button, i) => {
        button.classList.toggle('active', i === index);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showImage(index + 1);
    }, 3000); // Change image every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

prevBtn.addEventListener('click', () => {
    showImage(index - 1);
    stopAutoSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    showImage(index + 1);
    stopAutoSlide();
    startAutoSlide();
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        showImage(Number(button.dataset.slide));
        stopAutoSlide();
        startAutoSlide();
    });
});

// Initialize the carousel
showImage(index);
startAutoSlide();

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50); // Adjust the scroll threshold as needed
});
