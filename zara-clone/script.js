const menuIcon = document.getElementById('menu-icon');
const menuEl = document.getElementById('menu');
const mainImgEl = document.getElementById('main-img');
const mainEl = document.getElementById('contents');
const directControlCon = document.getElementById('direct-control');
const logoEl = document.getElementById('logo');

const mainData = {
    man: [{
            title: 'NEW IN',
            contents: "Explore this week's latest menswear pieces of the season curated for you <br>Autumn Winter Man Collection",
            image: "images/landscape_5.jpg"
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter Man Collection",
            image: "images/landscape_6.jpg"
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter Man Collection",
            image: "images/landscape_7.jpg"
        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            image: "images/landscape_8.jpg"
        }
    ],
    woman: [{
            title: 'NEW IN',
            contents: "Explore this week's latest womenswear pieces of the season curated for you<br>Autumn Winter Woman Collection",
            image: "images/landscape_1.jpg"
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter woman Collection",
            image: "images/landscape_2.jpg"
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter woman Collection",
            image: "images/landscape_3.jpg"
        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            image: "images/landscape_4.jpg"
        }
    ],

    kids: [{
            title: 'NEW IN',
            contents: "Explore this week's latest kidswear pieces of the season curated for you<br>Autumn Winter kids Collection",
            video: "video/fashion_sm.mp4"
        }, {
            title: 'COLLECTION',
            contents: "Discover this week's pieces from our latest collection <br>Autumn Winter kids Collection",
            image: "images/landscape_9.jpg"
        }, {
            title: 'SHOES & BABS',
            contents: "Explore the new collection of Shoes & Bags <br>Autumn Winter kids Collection",
            image: "images/landscape_10.jpg"
        },
        {
            title: 'JOIN LIFE',
            contents: "Working on different programmes to reduce the environmental impact of our products",
            image: "images/landscape_11.jpg"
        }
    ]
};

// Display main contents in DOM
function ShowMainElem() {
    // Create columns in DOM
    for (let column in mainData) {
        const columnEl = document.createElement('div');
        columnEl.classList.add('contents-column');

        // Create contents in column
        mainData[column].forEach(content => {
            const contentEl = document.createElement('div');
            contentEl.classList.add('content');
            if (content.video) {
                contentEl.innerHTML = `
                    <div class="content" id="content">
                        <video id="main-video" src="${content.video}" autoplay></video>
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    </div>`
            } else {
                contentEl.innerHTML = `
                    <div class="content" id="content">
                        <img id="main-img" src="${content.image}" alt="">
                        <h3>${content.title}</h3>
                        <p>${content.contents}</p>
                        <button class="btn view-btn" id="${content.title.toLowerCase()}">VIEW</button>
                        <button class="btn btn-down" id="down"><i class="fas fa-chevron-down"></i></button>
                    </div>`
            }
            columnEl.appendChild(contentEl);
        });
        mainEl.appendChild(columnEl);
    }
};

ShowMainElem();




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