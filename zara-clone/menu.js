const menuContainer = document.querySelector("#menu-container");

init();

// Get main data from data.json
async function getDataFromJson() {
    const response = await fetch("data/data.json");
    const data = await response.json();
    const menuData = data.data[0].menu;
    return menuData;
}

// Reset data
async function init() { // Call data
    const data = await getDataFromJson();

    // Reset menu data and display in DOM
    const menuTitleData = getMenuTitleData(data[0]);
    const ulListData = showMainMenu(data[0]);
    console.log(data);
}

function getMenuTitleData(menuData) {
    const menuArray = new Array();
    for (i in menuData) {
        menuArray.push(i);
    }
    return menuArray;
}

function showMainMenu(menuData) {
    const menuList = new Array();
    menuContainer.innerHTML = "";
    for (i in menuData) { // big menu data
        const ulEl = document.createElement("ul");
        ulEl.classList.add(i);
        ulEl.setAttribute("id", i);
        ulEl.innerHTML = `<h2>${
            i.toUpperCase()
        }</h2>`;

        if (Object.keys(menuData[i]).includes("image")) {
            ulEl.innerHTML = `<img src="${
                menuData[i].image
            }">`;
        }

        // inside menu
        for (j in menuData[i]) {
            const listItem = document.createElement("ul");
            listItem.innerHTML = `${j}`;

            // categories
            for (k in menuData[i][j]) {
                const subListItem = document.createElement("ul");
                subListItem.innerHTML = `${
                    menuData[i][j][k]
                }`;

                if (typeof menuData[i][j][k] == "object") { // console.log(menuData[i][j][k]);
                    subListItem.innerHTML = `${
                        Object.keys(menuData[i][j][k])
                    }`;
                }

                if (Object.keys(menuData[i][j]).includes("image")) {
                    listItem.innerHTML = `<img src="${
                        menuData[i][j].image
                    }">`;
                    subListItem.innerHTML = "";
                }

                // categories inside
                for (h in menuData[i][j][k]) {
                    console.log(menuData[i][j][k][h]);
                    if (typeof menuData[i][j][k][h] === "object") {
                        for (last of menuData[i][j][k][h]) {
                            const insideListItem = document.createElement("li");
                            insideListItem.innerHTML = `${last}`;
                            subListItem.appendChild(insideListItem);
                        }
                    }
                }
                listItem.appendChild(subListItem);
            }

            ulEl.appendChild(listItem);
        }

        menuList.push(ulEl);
        menuContainer.appendChild(ulEl);
    }

    console.log(menuList);
}

function displayTitleMenu() {}
