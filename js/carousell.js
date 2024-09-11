const carousel = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const buttons = document.querySelectorAll('.carousel-button');
let index = 0;
const items = carousel.querySelectorAll('img, video');
let autoSlideInterval;
let isSliding = false; // Prevents spamming of buttons

// Function to play video and wait 1 second before moving to the next slide
function handleVideoPlayback(video) {
    video.play();
    stopAutoSlide(); // Stop the auto-slide while the video is playing

    video.onended = () => {
        setTimeout(() => {
            isSliding = false;
            showImage(index + 1);
            startAutoSlide(); // Resume auto-slide after 1-second delay
        }, 2000); // 1 second delay after the video ends
    };
}

function showImage(n) {
    if (isSliding) return; // Prevent multiple rapid transitions
    isSliding = true;
    index = (n + items.length) % items.length;
    carousel.style.transform = `translateX(${-index * 100}%)`;
    updateButtons();

    // If the current item is a video, handle playback
    if (items[index].tagName.toLowerCase() === 'video') {
        handleVideoPlayback(items[index]);
    } else {
        setTimeout(() => {
            isSliding = false; // Allow sliding after the transition ends
        }, 500); // Add a delay for image transitions to smoothen the effect
    }
}

function updateButtons() {
    buttons.forEach((button, i) => {
        button.classList.toggle('active', i === index);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (items[index].tagName.toLowerCase() !== 'video') {
            showImage(index + 1);
        }
    }, 5000); // Change image every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Prevent spamming of next/prev buttons
prevBtn.addEventListener('click', () => {
    if (!isSliding) {
        showImage(index - 1);
        stopAutoSlide();
        startAutoSlide();
    }
});

nextBtn.addEventListener('click', () => {
    if (!isSliding) {
        showImage(index + 1);
        stopAutoSlide();
        startAutoSlide();
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isSliding) {
            showImage(Number(button.dataset.slide));
            stopAutoSlide();
            startAutoSlide();
        }
    });
});

// Initialize the carousel
showImage(index);
startAutoSlide();

// Stop the auto-slide while the video is playing
items.forEach(item => {
    if (item.tagName.toLowerCase() === 'video') {
        item.addEventListener('play', stopAutoSlide);
        item.addEventListener('pause', startAutoSlide);
    }
});
