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
        objs: {
            scene: document.querySelector('#scroll-section-1'),
            title: document.querySelector('#scroll-section-1 .title'),
            mainTextA: document.querySelector('.main-elem.a'),
            mainTextB: document.querySelector('.main-elem.b'),
            mainTextC: document.querySelector('.main-elem.c'),
            canvas: document.querySelector('#scroll-canvas-1'),
            context: document.querySelector('#scroll-canvas-1').getContext('2d'),
            videoImages: [],
        },
        values: {
            videoFrame: 370,
            videoSequence: [0, 369, { start: 0.2, end: 0.9 }],
            videoOpacityIn: [0, 1, { start: 0.1, end: 0.3 }],
            videoOpacityOut: [1, 0, { start: 0.9, end: 0.95 }],
            titleOpacityOut: [1, 0, { start: 0.9, end: 1 }],

            mainTextAOpactiytIn: [0, 1, { start: 0.2, end: 0.3 }],
            mainTextBOpactiytIn: [0, 1, { start: 0.45, end: 0.55 }],
            mainTextCOpactiytIn: [0, 1, { start: 0.7, end: 0.8 }],
            mainTextAOpactiytOut: [1, 0, { start: 0.35, end: 0.45 }],
            mainTextBOpactiytOut: [1, 0, { start: 0.6, end: 0.7 }],
            mainTextCOpactiytOut: [1, 0, { start: 0.85, end: 0.95 }],

            mainTextATranslateYIn: [20, 0, { start: 0.2, end: 0.3 }],
            mainTextBTranslateYIn: [20, 0, { start: 0.45, end: 0.55 }],
            mainTextCTranslateYIn: [20, 0, { start: 0.7, end: 0.8 }],
            mainTextATranslateYOut: [0, -20, { start: 0.35, end: 0.45 }],
            mainTextBTranslateYOut: [0, -20, { start: 0.6, end: 0.7 }],
            mainTextCTranslateYOut: [0, -20, { start: 0.85, end: 0.95 }],
        }
    }, {
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            scene: document.querySelector('#scroll-section-2'),
            title: document.querySelector('#scroll-section-2 .title'),
            text: document.querySelector('.pocket-spring-elem'),
            pin: document.querySelector('.pin'),
            canvas: document.querySelector('#scroll-canvas-2'),
            context: document.querySelector('#scroll-canvas-2').getContext('2d'),
            videoImages: [],
        },
        values: {
            videoFrame: 428,
            videoSequence: [0, 427, { start: 0.25, end: 0.6 }],
            videoOpacityIn: [0, 1, { start: 0.2, end: 0.3 }],
            videoOpacityOut: [1, 0, { start: 0.9, end: 0.95 }],
            videoTranslateYOut: [0, -20, { start: 0.8, end: 0.9 }],

            titleTranslateYIn: [20, 0, { start: 0.1, end: 0.2 }],
            titleTranslateYOut: [0, -20, { start: 0.35, end: 0.4 }],
            titleOpactiytIn: [0, 1, { start: 0.1, end: 0.2 }],
            titleOpactiytOut: [1, 0, { start: 0.35, end: 0.4 }],

            textTranslateYIn: [20, 0, { start: 0.15, end: 0.25 }],
            textOpactiytIn: [0, 1, { start: 0.15, end: 0.25 }],

            pinWidth: [10, 100, { start: 0.25, end: 0.35 }],


        }
    }, {
        heightNum: 5,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-3'), },
        values: {}
    }, {
        heightNum: 1,
        scrollHeight: 0,
        objs: { scene: document.querySelector('#scroll-section-4'), },
        values: {}
    }, ]

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = window.innerHeight * sceneInfo[i].heightNum;
            sceneInfo[i].objs.scene.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        YOffset = window.pageYOffset;

        const heightRatio = window.innerHeight / 1080;
        const widthRatio = window.innerWidth / 1920;

        if (window.innerHeight > window.innerWidth) {
            sceneInfo[1].objs.canvas.style.transform = `translateX(-50%) scale(${heightRatio})`;
            sceneInfo[2].objs.canvas.style.transform = `translateX(-50%) scale(${widthRatio*0.85})`;

        } else {
            sceneInfo[1].objs.canvas.style.transform = `translateX(-50%) scale(${widthRatio})`;
            sceneInfo[2].objs.canvas.style.transform = `translateX(-50%) scale(${heightRatio*0.85})`;
        }



    }

    function setInfoValues() {
        const objs = sceneInfo[0].objs;
        const values = sceneInfo[0].values;


        // section-0 text
        values.titleTop[2].start = (sceneInfo[0].scrollHeight - (objs.titleBlack.offsetTop + objs.titleBlack.offsetHeight)) / sceneInfo[0].scrollHeight;
        values.titleHeight[2].start = values.titleTop[2].start;
        values.titleHeight[2].end = values.titleHeight[2].start + (objs.titleWhite.offsetHeight / sceneInfo[currentScene].scrollHeight);
        values.titleHeight[0] = objs.titleWhite.offsetHeight;
    }


    function scrollLoop() {

        prevScrollHeight = 0;
        enterNewScene = false;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (prevScrollHeight + sceneInfo[currentScene].scrollHeight < YOffset) {
            enterNewScene = true;

            currentScene++;

            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (prevScrollHeight > YOffset) {
            enterNewScene = true;
            if (currentScene < 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;
        playAnimation();
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = YOffset - prevScrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        switch (currentScene) {
            case 0:
                objs.videoContainer.style.transform = `translateX(-50%) scale(${calcValues(values.videoScale, currentYOffset)})`

                objs.titleBlack.style.top = `${calcValues(values.titleTop, currentYOffset)}%`
                objs.titleWhite.style.top = `${calcValues(values.titleTop, currentYOffset)}%`
                objs.titleWhite.style.height = `${calcValues(values.titleHeight, currentYOffset)}px`

                break;
            case 1:
                if (enterNewScene) return;
                const sequenceIndex = Math.round(calcValues(values.videoSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequenceIndex], 0, 0);

                if (scrollRatio < 0.5) {
                    objs.canvas.style.opacity = calcValues(values.videoOpacityIn, currentYOffset);

                } else {
                    objs.canvas.style.opacity = calcValues(values.videoOpacityOut, currentYOffset);
                }

                if (scrollRatio <= 0.33) {
                    objs.mainTextA.style.opacity = calcValues(values.mainTextAOpactiytIn, currentYOffset);
                    objs.mainTextA.style.transform = `translate3d(-50%, ${calcValues(values.mainTextATranslateYIn, currentYOffset)}px, 0)`;
                } else {
                    objs.mainTextA.style.opacity = calcValues(values.mainTextAOpactiytOut, currentYOffset);
                    objs.mainTextA.style.transform = `translate3d(-50%, ${calcValues(values.mainTextATranslateYOut, currentYOffset)}px, 0)`;
                }
                if (scrollRatio <= 0.57) {
                    objs.mainTextB.style.opacity = calcValues(values.mainTextBOpactiytIn, currentYOffset);
                    objs.mainTextB.style.transform = `translate3d(-50%, ${calcValues(values.mainTextBTranslateYIn, currentYOffset)}px, 0)`;
                } else {
                    objs.mainTextB.style.opacity = calcValues(values.mainTextBOpactiytOut, currentYOffset);
                    objs.mainTextB.style.transform = `translate3d(-50%, ${calcValues(values.mainTextBTranslateYOut, currentYOffset)}px, 0)`;
                }
                if (scrollRatio <= 0.82) {
                    objs.mainTextC.style.opacity = calcValues(values.mainTextCOpactiytIn, currentYOffset);
                    objs.mainTextC.style.transform = `translate3d(-50%, ${calcValues(values.mainTextCTranslateYIn, currentYOffset)}px, 0)`;
                } else {
                    objs.mainTextC.style.opacity = calcValues(values.mainTextCOpactiytOut, currentYOffset);
                    objs.mainTextC.style.transform = `translate3d(-50%, ${calcValues(values.mainTextCTranslateYOut, currentYOffset)}px, 0)`;

                    objs.title.style.opacity = calcValues(values.titleOpacityOut, currentYOffset);
                    objs.title.style.transform = `translate3d(-50%, ${calcValues(values.mainTextCTranslateYOut, currentYOffset)}px, 0)`;
                }
                break;
            case 2:
                if (enterNewScene) return;
                const sequenceIndex2 = Math.round(calcValues(values.videoSequence, currentYOffset));
                const heightRatio = window.innerHeight / 1080;
                const canvasVideoXPos1 = objs.canvas.offsetWidth * heightRatio * 0.85;
                objs.context.drawImage(objs.videoImages[sequenceIndex2], canvasVideoXPos1, 0);




                if (scrollRatio <= 0.3) {
                    objs.title.style.opacity = calcValues(values.titleOpactiytIn, currentYOffset);
                    objs.text.style.opacity = calcValues(values.textOpactiytIn, currentYOffset);
                    objs.title.style.transform = `translateY(${calcValues(values.titleTranslateYIn, currentYOffset)}px)`;
                    objs.text.style.transform = `translateY(${calcValues(values.textTranslateYIn, currentYOffset)}px)`;
                    objs.pin.style.width = `${calcValues(values.pinWidth, currentYOffset)}px`;

                    objs.canvas.style.opacity = calcValues(values.videoOpacityIn, currentYOffset);
                } else {
                    objs.title.style.opacity = calcValues(values.titleOpactiytOut, currentYOffset);
                    objs.text.style.opacity = calcValues(values.titleOpactiytOut, currentYOffset);
                    objs.title.style.transform = `translateY(${calcValues(values.titleTranslateYOut, currentYOffset)}px)`;
                    objs.text.style.transform = `translateY(${calcValues(values.titleTranslateYOut, currentYOffset)}px)`;
                    objs.pin.style.width = `${calcValues(values.pinWidth, currentYOffset)}px`;

                    objs.canvas.style.opacity = calcValues(values.videoOpacityOut, currentYOffset);
                }

                break;
        }
    }


    function drawCanvasImages() {
        for (let i = 0; i < sceneInfo[1].values.videoFrame; i++) {
            const image = new Image();
            image.src = `../video/001/${i+1}.jpg`;
            sceneInfo[1].objs.videoImages.push(image);
        }

        for (let i = 0; i < sceneInfo[2].values.videoFrame; i++) {
            const image = new Image();
            image.src = `../video/003/${i+1}.jpg`;
            sceneInfo[2].objs.videoImages.push(image);
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


    // EventListeners
    window.addEventListener('scroll', () => {
        YOffset = window.pageYOffset;

        scrollLoop();
        playAnimation();
    });

    window.addEventListener('load', () => {
        setLayout();
        drawCanvasImages();

    })
    window.addEventListener('resize', () => {
        drawCanvasImages();
    })
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