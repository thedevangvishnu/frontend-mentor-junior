// implement toggle function for nav menu. Clicking the nav-hamburger icon should open the nav menu and clicking the close icon should hide it.

// select all necessary references
const navHamburger = document.getElementById("nav-hamburger"),
  navClose = document.getElementById("nav-close"),
  navMenu = document.getElementById("nav-menu");

navHamburger.addEventListener("click", () => {
  // show-hide menu
  navMenu.classList.add("show__menu");
  document.body.classList.add("nav__overlay");
});

navClose.addEventListener("click", () => {
  navMenu.classList.remove("show__menu");
  document.body.classList.remove("nav__overlay");
});
