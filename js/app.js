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
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById('navbar__list');
const pageSections = document.querySelectorAll('main > section');
const virsualDomFrag = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function easeGoToSection(e) {
    if (e.target.classList.contains('menu__link')) {
        e.preventDefault();

        let thisSection = document.getElementById(e.target.hash.slice(1))
        thisSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        addActiveClassToNavLink(e.target);
    }
}


function addActiveClassToNavLink(myLink) {
    document.querySelectorAll('.menu__link.menu__link--active')
                .forEach(link => link.classList.remove('menu__link--active'));
    myLink.classList.add('menu__link--active');
}


function addActiveClassToSectionViewed() {
    document.querySelectorAll('section.your-active-class')
            .forEach(link => link.classList.remove('your-active-class'));

    for (let section of pageSections) {
        if (isInViewport(section)) {
            section.classList.add('your-active-class');

            let thisLink = document.querySelector(`[href='#${section.id}']`);
            addActiveClassToNavLink(thisLink);
            break;
        }
    }
}


function isInViewport(el) {
    //const rect = el.getBoundingClientRect();
    // Only completely visible elements return true:
    // return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    // );
    return window.scrollY < el.offsetTop
    // Partially visible elements return true:
    //return rect.top < window.innerHeight && rect.bottom >= 0;
    
    //return rect.top <= document.documentElement.scrollTop && rect.top + rect.height > document.documentElement.scrollTop;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for (let section of pageSections) {
    let liItem = document.createElement('li');
    let navItem = document.createElement('a');
    navItem.textContent = section.dataset.nav;
    navItem.className = 'menu__link';
    navItem.href = `#${section.id}`;
    
    liItem.appendChild(navItem);
    virsualDomFrag.appendChild(liItem)
}
navbarList.appendChild(virsualDomFrag)

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navbarList.addEventListener('click', easeGoToSection);

// Set sections as active
document.addEventListener('scroll', addActiveClassToSectionViewed);

