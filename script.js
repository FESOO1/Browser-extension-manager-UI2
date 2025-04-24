const body = document.querySelector('body');
const extensionsContainer = document.querySelector('.main-extensions');
const filterButtons = document.querySelectorAll('.main-filter-button');
const themeButton = document.getElementById('themeButton');
let filterValue = 'all';
let isLightTheme = false;

// HANDLING THE FILTER BUTTONS

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', () => {
        for (const filterButton of filterButtons) {
            filterButton.classList.remove('main-filter-button-active');
        };
        filterButtons[i].classList.add('main-filter-button-active');
        filterValue = filterButtons[i].value;
        gettingTheExtensionsData();
    });
};

// GETTING THE EXTENSIONS DATA

async function gettingTheExtensionsData() {
    try {
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(response.status);
        };

        const data = await response.json();

        filterTheData(data);
    } catch(e) {
        console.error(e.name);
        console.error(e.message);
    };
};

gettingTheExtensionsData();

// FILTER THE DATA

function filterTheData(data) {
    let filteredData;

    if (filterValue === 'all') {
        filteredData = data;
    } else if (filterValue === 'active') {
        filteredData = data.filter(el => el.isActive === true);
    } else if (filterValue === 'inactive') {
        filteredData = data.filter(el => el.isActive === false);
    };

    displayingTheData(filteredData);
};

// DISPLAYING THE DATA

function displayingTheData(data) {
    extensionsContainer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        // EXTENSION
        const extension = document.createElement('div');
        extension.classList.add('main-extension');
        // EXTENSION TOP
        const extensionTop = document.createElement('div');
        extensionTop.classList.add('main-extension-top');
        const extensionTopImage = document.createElement('img');
        extensionTopImage.classList.add('main-extension-top-image');
        extensionTopImage.src = data[i].logo;
        extensionTopImage.alt = `${data[i].name}'s Logo`;
        const extensionTopTextContainer = document.createElement('div');
        extensionTopTextContainer.classList.add('main-extension-top-text-container');
        const extensionTopTextContainerHeader = document.createElement('h3');
        extensionTopTextContainerHeader.classList.add('main-extension-top-text-container-header');
        extensionTopTextContainerHeader.textContent = data[i].name;
        const extensionTopTextContainerParagraph = document.createElement('p');
        extensionTopTextContainerParagraph.classList.add('main-extension-top-text-container-paragraph');
        extensionTopTextContainerParagraph.textContent = data[i].description;

        extensionTopTextContainer.appendChild(extensionTopTextContainerHeader);
        extensionTopTextContainer.appendChild(extensionTopTextContainerParagraph);
        
        extensionTop.appendChild(extensionTopImage);
        extensionTop.appendChild(extensionTopTextContainer);
        
        // EXTENSION BOTTOM
        const extensionBottom = document.createElement('div');
        extensionBottom.classList.add('main-extension-bottom');

        const extensionBottomDelete = document.createElement('button');
        extensionBottomDelete.classList.add('main-extension-bottom-delete-button');
        extensionBottomDelete.type = 'button';
        extensionBottomDelete.textContent = 'Remove';
        
        const extensionBottomToggle = document.createElement('button');
        extensionBottomToggle.classList.add('main-extension-bottom-toggle-button');
        extensionBottomToggle.type = 'button';
        const extensionBottomToggleInner = document.createElement('div');
        extensionBottomToggleInner.classList.add('main-extension-bottom-toggle-button-inner');
        
        extensionBottomToggle.appendChild(extensionBottomToggleInner);

        if (data[i].isActive === true) {
            extensionBottomToggle.classList.add('main-extension-bottom-toggle-button-active');
        };
        
        extensionBottom.appendChild(extensionBottomDelete);
        extensionBottom.appendChild(extensionBottomToggle);

        // APPEND
        extension.appendChild(extensionTop);
        extension.appendChild(extensionBottom);
        extensionsContainer.appendChild(extension);
    };
};

// HANDLING THE THEME

function handlingTheTheme() {
    if (isLightTheme === false) {
        body.classList.add('body-theme-js');
        
        isLightTheme = true;
        localStorage.setItem('themeLS', isLightTheme);
    } else {
        body.classList.remove('body-theme-js');
        
        isLightTheme = false;
        localStorage.setItem('themeLS', isLightTheme);
    };
};  

// INITIALIZING THE BUTTONS
themeButton.addEventListener('click', handlingTheTheme);

// CHANGING THE THEME BASED ON WHAT IS STORED IN LOCAL STORAGE

function changingTheThemeBasedOnWhatIsStoredInLocalStorage() {
    const themeLS = localStorage.getItem('themeLS');
    
    if (themeLS === 'true') {
        isLightTheme = true;
        body.classList.add('body-theme-js');
    };
};

changingTheThemeBasedOnWhatIsStoredInLocalStorage();