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

// Filtering menu items based on category
function filterMenu(category) {
    const allItems = document.querySelectorAll('.menu-card');

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
}
