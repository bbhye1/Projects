const menuIcon = document.getElementById('menu-icon');
const menuEl = document.getElementById('menu');
const mainImgEl = document.getElementById('main-img');
const mainEl = document.getElementById('contents');
const logoEl = document.getElementById('logo');
const cartLogoEl = document.getElementById('cart');
const slideListCon = document.getElementById('slide-control');


const mainData = {
    man: [{
            title: 'NEW IN',
            contents: "Explore this week's latest menswear pieces of the season curated for you <br>Autumn Winter Man Collection",
            number: 5
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter Man Collection",
            number: 6
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter Man Collection",
            number: 7
        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            number: 8
        }
    ],
    woman: [{
            title: 'NEW IN',
            contents: "Explore this week's latest womenswear pieces of the season curated for you<br>Autumn Winter Woman Collection",
            number: 1
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter woman Collection",
            number: 2
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter woman Collection",
            number: 3
        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            number: 4
        }
    ],

    kids: [{
            title: 'NEW IN',
            contents: "Explore this week's latest kidswear pieces of the season curated for you<br>Autumn Winter kids Collection",
            video: "video/fashion_sm.mp4"
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter kids Collection",
            number: 9
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter kids Collection",
            number: 10

        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            number: 11

        }
    ]
};

let wheel = 0;
let currentActivePage = 1;

// Get data
const cateData = [];
const divListData = [];
let slideControlData = [];

for (let i in mainData) {
    cateData.push(i);
}

// Display main contents in DOM
function ShowMainElem() {
    // Create columns in DOM
    for (let column in mainData) {
        const columnEl = document.createElement('div');
        columnEl.classList.add('contents-column');
        const columnItemList = [];
        // Create contents in column
        mainData[column].forEach(content => {
            const contentEl = document.createElement('div');
            contentEl.classList.add('content');
            if (content.video) {
                contentEl.innerHTML = `
                    <div class="content" draggable = "true">
                        <video id="main-video" src="${content.video}" autoplay loop></video>
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    </div>`
            } else {
                contentEl.innerHTML = `
                    <div class="content" id="${content.number}" draggable = "true">
                        <img id="main-img" src="images/landscape_${content.number}.jpg" alt="">
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    </div>`
            }
            columnEl.appendChild(contentEl);
            columnItemList.push(contentEl);
        });
        mainEl.appendChild(columnEl);
        divListData.push(columnItemList);
    }
};

ShowMainElem();
getListItem();

// Button click

const horiPage = document.querySelectorAll('.contents-column');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

// Inital active page
horiPage[currentActivePage].className = 'contents-column active';
horiPage[currentActivePage - 1].className = 'contents-column left';
horiPage[currentActivePage + 1].className = 'contents-column right';

// Slide horizontal
function slideRight() {
    horiPage[currentActivePage].className = 'contents-column left';

    currentActivePage = currentActivePage + 1;

    if (currentActivePage >= horiPage.length) {
        currentActivePage = horiPage.length - 1
    }

    horiPage[currentActivePage].className = 'contents-column active';

    showSlideList();
    ShowhoriSlideBtn();
    getBtnText();
}

function slideLeft() {
    horiPage[currentActivePage].className = 'contents-column right';

    currentActivePage = currentActivePage - 1;

    if (currentActivePage < 0) {
        currentActivePage = 0
    }
    horiPage[currentActivePage].className = 'contents-column active';

    showSlideList();
    ShowhoriSlideBtn();
    getBtnText();
}


// Right button click event 
rightBtn.addEventListener('click', slideRight)

// Left button click event 
leftBtn.addEventListener('click', slideLeft)

// Show horizontal slide button by sliding page. 
function ShowhoriSlideBtn() {
    horiPage[currentActivePage].className = 'contents-column active';

    // Button display 
    if (horiPage[currentActivePage].className === 'contents-column active' &&
        currentActivePage === horiPage.length - 1) {
        rightBtn.style.display = 'none'
    } else if (horiPage[currentActivePage].className === 'contents-column active' &&
        currentActivePage === 0) {
        leftBtn.style.display = 'none'
    } else {
        rightBtn.style.display = 'block'
        leftBtn.style.display = 'block'
    }
}

// Button inner text 
function getBtnText() {
    if (leftBtn.style.display !== 'none') {
        leftBtn.innerHTML = `${cateData[currentActivePage - 1].toUpperCase()}<i class="fas fa-chevron-left"></i>`;
    }
    if (rightBtn.style.display !== 'none') {
        rightBtn.innerHTML = `<i class="fas fa-chevron-right"></i>${cateData[currentActivePage +1].toUpperCase()}`;
    }
}

// Slide vertical
// Slide down event listener

window.addEventListener('mousewheel', e => {
    const contents = getColumnElem();

    if (e.wheelDelta > 0) {
        wheel--;
    } else {
        wheel++;
    }

    if (wheel < 0) {
        wheel = 0;
    } else if (wheel >= contents.length) {
        wheel = contents.length - 1;
    }

    moveToSelectedSlide(wheel);
    changeMainColor();
    showCurrentSlide(wheel);
});

// Slide click event listener
slideListCon.addEventListener('click', e => {
    const parent = e.target.parentNode;
    if (!parent.classList.contains('slide-control')) {
        return;
    }

    slideControlData.forEach((slide, index) => {
        slide.classList.remove('on');
        if (slide === e.target) {
            e.target.classList.add('on');
            moveToSelectedSlide(index);
        }
    })

})

// Move to selected slide 
function moveToSelectedSlide(index) {
    horiPage[currentActivePage].style.top = `-${100*index}vh`
}

// Show current list in slide control list
showSlideList();


function showCurrentSlide(index) {
    const nowColumn = slideControlData[currentActivePage];
    for (let slide in nowColumn) {
        if (Number(slide) === Number(index)) {
            nowColumn[slide].classList.add('on');
        } else {
            nowColumn[slide].classList.remove('on');
        }
    }
}

// Change Main color 
function changeMainColor() {
    const logoChild = logoEl.childNodes[1];
    const cartLogoChild = cartLogoEl.childNodes[0].childNodes[0];

    if (wheel == 0 || wheel % 2 == 0) {
        document.documentElement.style.setProperty('--color-main', '#fff');
        logoChild.setAttribute('fill', 'white');
        cartLogoChild.setAttribute('fill', 'white');
    } else if (wheel % 2 == 1) {
        document.documentElement.style.setProperty('--color-main', '#000');
        logoChild.setAttribute('fill', 'black');
        cartLogoChild.setAttribute('fill', 'black');
    }
}



// Show slide control list in DOM
function showSlideList() {
    const nowColumn = slideControlData[currentActivePage];
    slideListCon.innerHTML = '';

    nowColumn.forEach(list => {
        slideListCon.appendChild(list);
    })
}

// Create list item data 
function getListItem() {
    for (column of divListData) {
        const columnList = [];
        column.forEach(() => {
            const listEl = document.createElement('li');
            columnList.push(listEl);
        })
        columnList[0].classList.add('on');
        slideControlData.push(columnList);

    }
}

// Get slides of each column
function getColumnElem() {
    return horiPage[currentActivePage].children;
}


// Change image by window size
// window.addEventListener('resize', () => {
//     if (window.innerWidth <= 970) {
//         mainData.src = "images/portrait_1.jpg";
//     } else if (window.innerWidth > 970) {
//         mainImgEl.src = "images/landscape_1.jpg";
//     }
// })

// Navigation show event listener
menuIcon.addEventListener('mouseover', () => {
    menuEl.classList.add('show');
});
menuEl.addEventListener('mouseleave', () => {
    menuEl.classList.remove('show');
});

// Slide move by dragging the page
let startX = 0;
let startY = 0;
let dragPerX = 0;
let dragPerY = 0;
let dragDirect;

// Drag event listeners
mainEl.addEventListener('mousedown', e => {
    startX = e.clientX
    startY = e.clientY
})

mainEl.addEventListener('dragover', e => {
    dragPerX = (startX - e.clientX) / window.innerWidth * -100;
    dragPerY = (startY - e.clientY) / document.body.offsetHeight * -100;

    // Get the direction
    if (Math.abs(dragPerX) < Math.abs(dragPerY)) {
        dragDirect = 'vertical';
    }
    if (Math.abs(dragPerY) < Math.abs(dragPerX)) {
        dragDirect = 'horizontal';
    }

    // Move content while dragging content 
    if (dragDirect === 'horizontal') {
        mainEl.style.transform = `translateX(${(dragPerX+1)}vw)`;
    }
    if (dragDirect === 'vertical') {
        horiPage[currentActivePage].style.top = `${(dragPerY+1)}vh`;
    }

    mainEl.style.transition = 'none';
});



mainEl.addEventListener("dragend", e => {
    const contents = getColumnElem();
    mainEl.style.transform = `translateX(0vw)`;
    mainEl.style.transition = 'transform 1s ease';

    // Get the Vertical page index
    const endY = e.clientY;
    if (startY < endY) {
        wheel--;
    } else {
        wheel++;
    }

    if (wheel < 0) {
        wheel = 0;
    } else if (wheel >= contents.length) {
        wheel = contents.length - 1;
    }

    // Slide to its direction
    if (dragDirect === 'horizontal') {
        if (dragPerX < 0) {
            slideRight();

        } else if (dragPerX > 0) {
            slideLeft();
        }
    }

    if (dragDirect === 'vertical') {
        moveToSelectedSlide(wheel);
    }
})