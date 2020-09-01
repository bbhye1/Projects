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
            videoContainer: document.querySelector('.video-wrap'),
            titleBlack: document.querySelector('.title-wrap-black'),
            titleWhite: document.querySelector('.title-wrap-white'),
        },
        values: {
            videoScale: [1, 0.95, { start: 0, end: 0.1 }],
            titleTop: [35, 30, { start: 0, end: 1 }],
            titleHeight: [0, 0, { start: 0, end: 1 }],

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

    function setInfoValues() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;


        // section-0 text
        values.titleTop[2].start = (sceneInfo[currentScene].scrollHeight - (objs.titleBlack.offsetTop + objs.titleBlack.offsetHeight)) / sceneInfo[currentScene].scrollHeight;
        values.titleHeight[2].start = values.titleTop[2].start;
        values.titleHeight[2].end = values.titleHeight[2].start + (objs.titleWhite.offsetHeight / sceneInfo[currentScene].scrollHeight);
        values.titleHeight[0] = objs.titleWhite.offsetHeight;

    }



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

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = YOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                objs.videoContainer.style.transform = `translateX(-50%) scale(${calcValues(values.videoScale, currentYOffset)})`

                objs.titleBlack.style.top = `${calcValues(values.titleTop, currentYOffset)}%`
                objs.titleWhite.style.top = `${calcValues(values.titleTop, currentYOffset)}%`
                objs.titleWhite.style.height = `${calcValues(values.titleHeight, currentYOffset)}px`

                break;
        }
    }



    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values[2]) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1]
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv
    }

    window.addEventListener('scroll', () => {
        scrollLoop();
        playAnimation();
    });
    setLayout();
    setInfoValues();

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