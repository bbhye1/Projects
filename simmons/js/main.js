(() => {
    const mainNav = document.querySelector('#main-nav')
    const leftNav = document.querySelector('.left-nav');
    const rightNav = document.querySelector('.right-nav');
    let YOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false;


    const sceneInfo = [{
        heightNum: 1,
        scrollHeight: 0,
        objs: {
            scene: document.querySelector('#scroll-section-0'),
            video: document.querySelector('#scroll-section-0-video')
        },
        valuse: {

        }
    }, {
        heightNum: 4,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-1'), },
        valuse: {}
    }, {
        heightNum: 5,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-2'), },
        valuse: {}
    }, {
        heightNum: 5,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-3'), },
        valuse: {}
    }, {
        heightNum: 1,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-4'), },
        valuse: {}
    }, ]

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = window.innerHeight * sceneInfo[i].heightNum;
            sceneInfo[i].objs.scene.style.height = `${sceneInfo[i].scrollHeight}px`;

        }
    }
    setLayout();




    function scrollLoop() {
        YOffset = window.pageYOffset;
        prevScrollHeight = 0;
        enterNewScene = false;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (prevScrollHeight + sceneInfo[currentScene].scrollHeight < YOffset) {
            enterNewScene = true;
            if (currentScene < sceneInfo.length - 1) {
                currentScene++;
            }
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (prevScrollHeight > YOffset) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }

        if (enterNewScene) return;
    }


    window.addEventListener('scroll', scrollLoop);


    // Side navigetion display
    mainNav.addEventListener('click', (e) => {
        const parentNodeClass = e.target.parentNode.className;

        if (parentNodeClass === 'menu') {
            leftNav.style.left = 0;
            rightNav.style.right = '-250px';
        } else if (parentNodeClass === 'cart') {
            rightNav.style.right = 0;
            leftNav.style.left = '-250px';
        }
    });

    leftNav.addEventListener('click', e => {
        const parentNodeClass = e.target.parentNode.className;
        if (parentNodeClass === 'close-btn') {
            leftNav.style.left = '-250px';
        }
    });
    rightNav.addEventListener('click', e => {
        const parentNodeClass = e.target.parentNode.className;
        if (parentNodeClass === 'close-btn') {
            rightNav.style.right = '-250px';
        }
    });

})();