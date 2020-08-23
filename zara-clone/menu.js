const menuContainer = document.querySelector('#menu-container')

init()

// Get main data from data.json
async function getDataFromJson () {
  const response = await fetch('data/data.json')
  const data = await response.json()
  const menuData = data.data[0].menu
  return menuData
}

// Initial
async function init () {
  // Call data
  const data = await getDataFromJson()

  // Reset menu data and display in DOM
  const menuTitleData = getMenuTitleData(data[0])
  const ulListData = showMainMenu(data[0])

  // Event Handler
  setEventByMenuData(ulListData)
}

function getMenuTitleData (menuData) {
  const menuArray = new Array()

  for (title in menuData) {
    menuArray.push(title)
  }
  return menuArray
}

function showMainMenu (menuData) {
  const menuList = new Array()
  menuContainer.innerHTML = ''

  getTitleUlEl(menuData, menuList)

  return menuList
}

function getTitleUlEl (data, menuList) {
  for (title in data) {
    // titleUlEl
    const titleUlEl = document.createElement('ul')
    titleUlEl.className = `title ${title}`
    titleUlEl.innerHTML = `<h2>${title.toUpperCase()}</h2>`

    if (Object.keys(data[title]).includes('image')) {
      titleUlEl.innerHTML = `<img src="${data[title].image}">`
    }

    // insidetitleUlEl
    getInsidetitleUlEl(data[title], titleUlEl)

    menuList.push(titleUlEl)
    menuContainer.appendChild(titleUlEl)
  }
}

function getInsidetitleUlEl (data, titleUlEl) {
  for (insideTitle in data) {
    const listItem = document.createElement('ul')
    listItem.setAttribute(
      'class',
      `inside-title ${insideTitle.replace(' ', '-')}`
    )
    listItem.innerHTML = `<h3>${insideTitle.toUpperCase()}</h3>`

    // categoriesUlEl
    getCateUlEl(data[insideTitle], listItem)

    titleUlEl.appendChild(listItem)
  }
}

function getCateUlEl (data, listItem) {
  for (category in data) {
    const subListItem = document.createElement('ul')
    const categoryTitle = data[category]
    subListItem.setAttribute('class', `category ${categoryTitle}`)
    subListItem.innerHTML = `<h4>${String(categoryTitle).toUpperCase()}</h4>`

    if (typeof data[category] == 'object') {
      const name = Object.keys(data[category])
      subListItem.setAttribute(
        'class',
        `category ${String(name).replace(' ', '-')}`
      )
      subListItem.innerHTML = `<h4>${String(name).toUpperCase()}</h4>`
    }

    if (Object.keys(data).includes('image')) {
      listItem.innerHTML = `<img src="${data.image}">`
      subListItem.innerHTML = ''
    }

    // categories insideUlEl
    getInsideCateLiEl(data[category], subListItem)
    listItem.appendChild(subListItem)
  }
}

function getInsideCateLiEl (data, subListItem) {
  for (insideCategory in data) {
    if (typeof data[insideCategory] === 'object') {
      for (last of data[insideCategory]) {
        const insideListItem = document.createElement('li')
        insideListItem.setAttribute(
          'class',
          `insideCategory ${last.replace(' ', '-')}`
        )
        insideListItem.innerHTML = `<h5>${last}<h5>`

        subListItem.appendChild(insideListItem)
      }
    }
  }
}

function setEventByMenuData (ulListData) {
  menuContainer.addEventListener('click', e => {
    displayInsideTitle(e, ulListData)
  })
}
function displayInsideTitle (e, ulListData) {
  for (title of ulListData) {
    if (
      e.target.nodeName !== 'DIV' &&
      e.target.nodeName !== 'UL' &&
      e.target.parentNode == title
    ) {
      title.classList.add('active')
    } else if (e.target.parentNode.parentNode === menuContainer) {
      title.classList.remove('active')
    }

    displayCategry(e, title)
  }
}

function displayCategry (e, title) {
  if (title.classList.contains('active')) {
    for (insideTitle of title.children) {
      if (e.target.parentNode == insideTitle) {
        insideTitle.classList.add('active')
      } else if (e.target.parentNode.parentNode === title) {
        insideTitle.classList.remove('active')
      }

      displayInsideCategory(e, insideTitle)
    }
  }
}

function displayInsideCategory (e, insideTitle) {
  if (insideTitle.classList.contains('active')) {
    for (category of insideTitle.children) {
      if (category == e.target.parentNode) {
        category.classList.add('active')
      } else if (e.target.parentNode.parentNode === insideTitle) {
        category.classList.remove('active')
      }
      selectInsideCategory(e, category)
    }
  }
}

function selectInsideCategory (e, category) {
  if (category.classList.contains('active')) {
    for (insideCategory of category.children) {
      if (insideCategory === e.target.parentNode) {
        insideCategory.classList.add('active')
      } else {
        insideCategory.classList.remove('active')
      }
    }
  }
}
