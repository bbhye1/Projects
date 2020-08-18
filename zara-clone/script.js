const menuIcon = document.getElementById('menu-icon');
const menuEl = document.getElementById('menu');
const mainImgEl = document.getElementById('main-img');

// Change image by window size
window.addEventListener('resize', () => {
    if (window.innerWidth <= 970) {
        mainImgEl.src = "images/portrait_0 (5).jpg";
    } else if (window.innerWidth > 970) {
        mainImgEl.src = "images/landscape_0 (2).jpg";
    }
})



// Navigation show event listener
menuIcon.addEventListener('mouseover', () => {
    menuEl.classList.add('show');
});
menuEl.addEventListener('mouseleave', () => {
    menuEl.classList.remove('show');
})