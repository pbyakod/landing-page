/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const header = document.querySelector('.page__header');
const navBar = document.querySelector('.navbar__menu')
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createNavButton(section) {
    const navButton = document.createElement('li');
    navButton.insertAdjacentHTML("afterbegin", `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`);
    return navButton;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav() {
    sections.forEach((section) => {
        const navButton = createNavButton(section);
        navList.appendChild(navButton);
        scrollBehavior(navButton, section);
    });
    navBar.appendChild(navList);
}


buildNav();

// Add class 'active' to section when near top of viewport

function activeSection() {
    const menuLinks = document.querySelectorAll(".menu__link");

    sections.forEach((section, i) => {
        const sectionBounds = section.getBoundingClientRect();
        const isSectionActive = sectionBounds.top <= 380 && sectionBounds.bottom >= 350;

        section.classList.toggle("your-active-class", isSectionActive);
        menuLinks[i].classList.toggle("active_button", isSectionActive);
    });
}


// Scroll to anchor ID using scrollTO event

function scrollBehavior(navButton, section) {
    navButton.addEventListener('click', handleNavButtonClick);

    function handleNavButtonClick(event) {
        event.preventDefault();
        smoothScrollTo(section.offsetTop);
    }

    function smoothScrollTo(offsetTop) {
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

function toggleNavBar(){
    let userScroll;
    header.style.cssText = 'opacity: 1; transition: ease 0.3s ;'
    window.clearTimeout( userScroll );
    userScroll = setTimeout(function() {
        header.style.cssText = 'opacity: 0; transition: ease 0.3s ;'
    }, 4000);
}

window.addEventListener('scroll',(event)=>{
    activeSection();
    toggleNavBar();
})