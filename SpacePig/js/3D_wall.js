(function() {
    const houseElem = document.querySelector('.house');
    const stageElem = document.querySelector('.stage');
    const progressElem = document.querySelector('.progress-bar');
    const progressImgElem = document.querySelector('.progress-bar>img');
    let maxScroll;
    let mousePos = {
        x: 0,
        y: 0
    }

    function scrollHandler() {
        const scrollPer = pageYOffset / maxScroll;
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        //progress-bar
        progressElem.style.width = scrollPer * 100 + '%';
        progressImgElem.style.left = scrollPer * 100 + '%';
    }

    function resizeHandler() {
        maxScroll = document.body.offsetHeight - window.innerHeight;
    }

    function mouseMoveHandler(e) {
        mousePos.x = (e.clientX / window.innerWidth - 0.5) * 30;
        mousePos.y = -(e.clientY / window.innerHeight - 0.5) * 30;
        stageElem.style.transform = 'rotateX(' + mousePos.y + 'deg) rotateY(' + mousePos.x + 'deg)'
    }

    function clickHandler(e) {

        new Character({
            x: e.clientX / window.innerWidth,
            speed: Math.random() * 0.5 + 0.2
        });
    }
    window.addEventListener('click', clickHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    resizeHandler();

})();