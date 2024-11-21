import {
  toggleBurger,
  closeBurger,
  setNavbarActives,
  toggleDropdown,
  closeDropdownNavBar,
} from "../../client/components/navbar/navbar.js";

import {
  cardPropsComputacion,
  cardPropsIngSoftware,
  cardPropsComputadores,
  cardPropsAboutUs,
} from "../../utils/constants.js";

import {
  loadOutCardLayoutTfgs,
  loadOutCardsAboutUs,
} from "../../client/components/cards.js";

import {
  constructFormLayoutPhone,
  formValidation,
  observeChangesForm,
} from "../scripts/form.js";

import {
  onFocusSearchBar,
  formSearchBarEvents,
} from "../../client/components/navbar/searchbar.js";

/**
 * Load the passed html componnet
 * @param {String} componentName the name of the HTML component
 * @param {String} containerId the container to insert the HTML component
 */
export const loadComponent = (componentName, containerId) => {
  return new Promise((resolve, reject) => {
    fetch(`./client/components/${componentName}.html`)
      .then((response) => response.text())
      .then((html) => {
        const container = document.getElementById(containerId);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Clone the first element from the temporary div
        const component = tempDiv.firstElementChild.cloneNode(true);

        // Append the cloned component to the container
        container.appendChild(component);
        resolve(container);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getWidthWindow = () => {
  return window.innerWidth;
};

/**
 * Set the navigation nav bar menu
 */
export const setNavbarMenu = () => {
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
        onFocusSearchBar();
        formSearchBarEvents();
      });
  }
};

window.addEventListener("load", () => {
  setNavbarActives();
});

window.addEventListener("resize", () => {
  setNavbarMenu();
});

/**
 * Render TFGS card components in DOM
 */
export const loadTFGSComponents = async () => {
  await loadOutCardLayoutTfgs(
    0,
    "Memorias de TFG's de Computación",
    cardPropsComputacion
  );
  await loadOutCardLayoutTfgs(
    1,
    "Memorias de TFGs ingeniería del software",
    cardPropsIngSoftware
  );
  await loadOutCardLayoutTfgs(
    2,
    "Memorias de TFGs ingeniería de computadores",
    cardPropsComputadores
  );
};

/**
 * Render about us components in DOM
 */
export const loadAboutUsComponents = async () => {
  await loadOutCardsAboutUs(cardPropsAboutUs);
};

/**
 * Render the form in DOM
 */
export const loadForm = async () => {
  await loadComponent("form", "content-container");
  constructFormLayoutPhone();
  formValidation();
  await observeChangesForm();
};
