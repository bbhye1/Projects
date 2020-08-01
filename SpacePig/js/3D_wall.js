(function() {
    const houseElem = document.querySelector('.house');
    let maxScroll;

    function scrollHandler() {
        const scollPer = pageYOffset / maxScroll;
        const zMove = scollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
    }

    function resizeHandler() {
        maxScroll = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
})();