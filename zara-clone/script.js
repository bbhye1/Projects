const menuIcon = document.getElementById('menu-icon');
const menuEl = document.getElementById('menu');
const mainImgEl = document.getElementById('main-img');
const mainEl = document.getElementById('contents');
const logoEl = document.getElementById('logo');
const cartLogoEl = document.getElementById('cart');
const slideListCon = document.getElementById('slide-control');


// Get main data from data.json 
async function getDataFromJson() {
    const response = await fetch('data/data.json');
    const data = await response.json();
    const wholeData = data.data[0];
    return wholeData;
}

// Reset data
async function init() {
    // Call data 
    const data = await getDataFromJson();
    const mainData = data.mainData;
    const menuData = data.menu;

    // Reset data and display in DOM
    const divListData = ShowMainElem(mainData);
    const cateData = getCateDataFromMain(mainData);
    let slideControlData = getListItem(divListData);

    // show inital active page
    setInitActivePage(divListData);

    // Set Event listeners
    setEventByMainData(divListData, cateData);

}

function setEventByMainData(divListData, cateData) {
    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');

    // Horizontal button click event 
    rightBtn.addEventListener('click', () => slideRight(divListData, cateData, leftBtn, rightBtn))
    leftBtn.addEventListener('click', () => slideLeft(divListData, cateData, leftBtn, rightBtn))
}

function setInitActivePage(divListData) {
    divListData[currentActivePage].className = 'contents-column active';
    divListData[currentActivePage - 1].className = 'contents-column left';
    divListData[currentActivePage + 1].className = 'contents-column right';
}

init();

let wheel = 0;
let currentActivePage = 1;

// get category data from mainData
function getCateDataFromMain(mainData) {
    const dataArr = new Array();
    for (let subject in mainData) {
        dataArr.push(subject);
    }
    return dataArr;
}

// Display main contents in DOM
function ShowMainElem(mainData) {
    const divList = new Array();

    // Create columns in DOM
    for (let column in mainData) {
        const columnItem = mainData[column];

        const columnEl = document.createElement('div');
        columnEl.classList.add('contents-column');

        // Create contents in column
        columnItem.forEach(content => {
            const contentEl = document.createElement('div');
            contentEl.classList.add('content');
            contentEl.setAttribute('draggable', true);

            if (content.video) {
                contentEl.innerHTML = `
                        <video id="main-video" src="${content.video}" autoplay loop /></video>
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    `
            } else {
                contentEl.setAttribute('id', content.number)
                contentEl.innerHTML = `
                        <img id="main-img" src="images/landscape_${content.number}.jpg" alt="">
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    `
            }
            columnEl.appendChild(contentEl);
        });
        mainEl.appendChild(columnEl);
        divList.push(columnEl);
    }
    return divList;
};

// Slide horizontal
function slideRight(divListData, cateData, leftBtn, rightBtn) {
    divListData[currentActivePage].className = 'contents-column left';

    currentActivePage = currentActivePage + 1;

    if (currentActivePage >= divListData.length) {
        currentActivePage = divListData.length - 1
    }

    divListData[currentActivePage].className = 'contents-column active';

    // showSlideList();
    ShowhoriSlideBtn(divListData, cateData, leftBtn, rightBtn);
}

function slideLeft(divListData, cateData, leftBtn, rightBtn) {
    divListData[currentActivePage].className = 'contents-column right';

    currentActivePage = currentActivePage - 1;

    if (currentActivePage < 0) {
        currentActivePage = 0
    }
    divListData[currentActivePage].className = 'contents-column active';

    // showSlideList();
    ShowhoriSlideBtn(divListData, cateData, leftBtn, rightBtn);
}




// Show horizontal slide button by sliding page. 
function ShowhoriSlideBtn(divListData, cateData, leftBtn, rightBtn) {

    divListData[currentActivePage].className = 'contents-column active';

    // Button display 
    if (divListData[currentActivePage].className === 'contents-column active' &&
        currentActivePage === divListData.length - 1) {
        rightBtn.style.display = 'none'

    } else if (divListData[currentActivePage].className === 'contents-column active' &&
        currentActivePage === 0) {
        leftBtn.style.display = 'none'

    } else {
        rightBtn.style.display = 'block'
        leftBtn.style.display = 'block'

    }

    // Button inner text 
    getBtnText(cateData, leftBtn, rightBtn);
}


function getBtnText(cateData, leftBtn, rightBtn) {
    if (leftBtn.style.display !== 'none') {
        leftBtn.innerHTML = `${cateData[currentActivePage -1].toUpperCase()}<i class="fas fa-chevron-left"></i>`;
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

    slideControlData[currentActivePage].forEach((listItem, index) => {
        listItem.classList.remove('on');
        if (listItem === e.target) {
            e.target.classList.add('on');
            moveToSelectedSlide(index);
        }
    });

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
function getListItem(divListData) {
    const ListItems = new Array();

    for (column of divListData) {
        const columnChildEls = column.children;
        const columnList = new Array();

        for (let i = 0; i < columnChildEls.length; i++) {
            const listEl = document.createElement('li');
            columnList.push(listEl);
        }

        columnList[0].classList.add('on');
        ListItems.push(columnList);
    }
    return ListItems;
}

// Get slides of each column
function getColumnElem() {
    return horiPage[currentActivePage].children;
}

// Change image by window size
window.addEventListener('resize', () => {
    const contents = document.querySelectorAll('#main-img');
    for (i of contents) {
        const imgNum = i.parentElement.id;
        if (window.innerWidth <= 970) {
            i.src = `images/portrait_${imgNum}.jpg`
        } else if (window.innerWidth > 970) {
            i.src = `images/landscape_${imgNum}.jpg`
        }
    }

})

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
        showCurrentSlide(wheel);
    }
})