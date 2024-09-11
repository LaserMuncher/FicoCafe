// Add event listeners to buttons
document.querySelectorAll('.menu-filter button').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        filterMenu(category);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the slider using slick.js
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000
    });
});

function filterMenu(category) {
    const allItems = document.querySelectorAll('.menu-card');
    const buttons = document.querySelectorAll('.menu-filter button');

    if (category === 'all') {
        allItems.forEach(item => {
            item.style.display = 'block';
        });
    } else {
        allItems.forEach(item => {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Remove selected class from all buttons
    buttons.forEach(button => button.classList.remove('selected'));

    // Add selected class to the clicked button
    const selectedButton = Array.from(buttons).find(button => button.getAttribute('data-category') === category);
    if (selectedButton) {
        selectedButton.classList.add('selected');

        // Scroll to the selected button on mobile
        if (window.innerWidth <= 768) {
            const menuFilter = document.querySelector('.menu-filter');
            const buttonOffset = selectedButton.offsetLeft;
            const menuFilterWidth = menuFilter.offsetWidth;
            const buttonWidth = selectedButton.offsetWidth;
            const scrollPosition = buttonOffset - (menuFilterWidth / 2) + (buttonWidth / 2);
            menuFilter.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
}

