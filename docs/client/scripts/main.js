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
  absolutePath,
} from "../../utils/constants.js";

import {
  loadOutCardLayoutTfgs,
  loadOutCardsAboutUs,
  loadOutCardTfgsDesktop,
  loadOutCardsAboutUsDesktop,
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
    fetch(`${absolutePath}/client/components/${componentName}.html`)
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
    fetch(`${absolutePath}/client/components/navbar/burger-menu.html`)
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
    fetch(`${absolutePath}/client/components/navbar/navbar-menu.html`)
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
  const mainContent = document.getElementById("content-container");
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.flexDirection = "row";
  titleContainer.style.width = "100%";
  titleContainer.style.justifyContent = "start";
  titleContainer.style.alignItems = "start";
  titleContainer.style.marginTop = "2%";
  titleContainer.style.marginBottom = "5%";
  const title = document.createElement("h2");
  title.textContent = "Mejores Memorias Ciclo: 2023-2024";
  title.style.fontWeight = "600";
  titleContainer.appendChild(title);

  const divider1 = document.createElement("div");
  divider1.style.display = "flex";
  divider1.style.flexDirection = "row";
  divider1.style.width = "95%";
  divider1.style.marginBottom = "3%";
  divider1.style.backgroundColor = "black";
  divider1.style.height = "1px";
  mainContent.appendChild(titleContainer);
  mainContent.appendChild(divider1);
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
export const loadOutCardLayoutTfgsDesktop = async () => {
  const mainContent = document.getElementById("content-container");
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.flexDirection = "row";
  titleContainer.style.width = "100%";
  titleContainer.style.justifyContent = "start";
  titleContainer.style.alignItems = "start";
  titleContainer.style.marginTop = "2%";
  titleContainer.style.marginBottom = "5%";
  const title = document.createElement("h1");
  title.textContent = "Mejores Memorias Ciclo: 2023-2024";
  title.style.fontWeight = "600";
  titleContainer.appendChild(title);

  const divider1 = document.createElement("div");
  divider1.style.display = "flex";
  divider1.style.flexDirection = "row";
  divider1.style.width = "95%";
  divider1.style.marginBottom = "3%";
  divider1.style.backgroundColor = "black";
  divider1.style.height = "1px";
  mainContent.appendChild(titleContainer);
  mainContent.appendChild(divider1);
  await loadOutCardTfgsDesktop(
    0,
    "Memorias de TFG's de Computación",
    cardPropsComputacion
  );
  await loadOutCardTfgsDesktop(
    1,
    "Memorias de TFGs ingeniería del software",
    cardPropsIngSoftware
  );
  await loadOutCardTfgsDesktop(
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

export const loadOutAboutUsDesktop = async () => {
  await loadOutCardsAboutUsDesktop(cardPropsAboutUs);
};

/**
 * Render the form in DOM
 */
export const loadForm = async () => {
  await loadComponent("form", "content-container");
  // await loadComponent("progress_bar", "form-eval");
  constructFormLayoutPhone();
  formValidation();
  await observeChangesForm();
};

export const loadCalendars = async () => {
  await loadComponent("calendarios_phone", "content-container");
};

export const loadHomeComponents = async () => {
  await loadComponent("intro", "content-container");
};

export const loadReq = async () => {
  await loadComponent("req_nor", "content-container");
};

export const setFooter = () => {
  fetch(`${absolutePath}/client/components/footer/footer.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("footer-container").innerHTML = html;
    });
};
