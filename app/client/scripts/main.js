import {
  toggleBurger,
  closeBurger,
  setNavbarActives,
  toggleDropdown,
  closeDropdownNavBar,
} from "../../client/components/navbar/navbar.js";

export function loadComponent(componentName, containerId) {
  fetch(`./components/${componentName}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;
    });
}

export function getWidthWindow() {
  return window.innerWidth;
}

export function setNavbarMenu() {
  const width = getWidthWindow();
  // phone
  if (width < 768) {
    fetch("./client/components/navbar/burger-menu.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("navbar-container").innerHTML = html;
        document
          .getElementById("sidenav-toggler")
          .addEventListener("click", toggleBurger);
        document
          .getElementById("sidenav-closer")
          .addEventListener("click", closeBurger);
        setNavbarActives();
      });
  } else {
    // desktop
    fetch("./client/components/navbar/navbar-menu.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("navbar-container").innerHTML = html;
        document
          .getElementById("navbarNavDropdown")
          .addEventListener("click", (event) => {
            toggleDropdown(event);
          });
        closeDropdownNavBar();
        setNavbarActives();
      });
  }
}

window.addEventListener("load", function () {
  setNavbarActives();
});
