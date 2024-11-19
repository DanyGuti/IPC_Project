import {
  loadTFGSComponents,
  loadAboutUsComponents,
  loadForm,
  loadHomeComponents,
  loadCalendarComponents
} from "../../scripts/main.js";

/**
 * Toggle the state of the burger menu
 */
export function toggleBurger() {
  var sidenav = document.getElementById("sidenav-1");
  var sidenavToggler = document.getElementById("sidenav-toggler");
  var sidenavCloser = document.getElementById("sidenav-closer");
  if (sidenav.style.left === "0px") {
    sidenav.style.left = "-50%";
    sidenavToggler.style.display = "block";
    sidenavCloser.style.display = "none";
  } else {
    sidenav.style.left = "0";
    sidenavToggler.style.display = "none";
    sidenavCloser.style.display = "block";
  }
}

/**
 * Get the current windoe size
 */
function getWidthWindow() {
  return window.innerWidth;
}

/**
 * Close the burger navigation menu
 */
export function closeBurger() {
  var sidenav = document.getElementById("sidenav-1");
  var sidenavToggler = document.getElementById("sidenav-toggler");
  var sidenavCloser = document.getElementById("sidenav-closer");

  sidenav.style.left = "-50%";
  sidenavToggler.style.display = "block";
  sidenavCloser.style.display = "none";
}

/**
 * Toggle the menu navbar dropdown state
 * @param {Event}
 */
export function toggleDropdown(event) {
  event.preventDefault();
  const dropdownMenu = event.target.nextElementSibling;
  if (!dropdownMenu) {
    return;
  }
  const isExpanded = dropdownMenu.classList.contains("show");

  const openDropdowns = document.querySelectorAll(".dropdown-menu.show");
  openDropdowns.forEach((menu) => {
    menu.classList.remove("show");
  });
  if (!isExpanded) {
    dropdownMenu.classList.add("show");
  }
}

/**
 * Close the dropdown menu navbar in desktop
 */
export function closeDropdownNavBar() {
  document.addEventListener("click", (event) => {
    const dropdowns = document.querySelectorAll(".dropdown-menu");
    dropdowns.forEach((dropdown) => {
      if (
        !dropdown.contains(event.target) &&
        !event.target.classList.contains("dropdown-toggle")
      ) {
        dropdown.classList.remove("show");
      }
    });
  });
}

/**
 * Set the active state of the navbar
 * based on the current window location
 */
export async function setNavbarActives() {
  /**
   * Set the initial state of the links
   * @param {string} - The active link id
   */
  const setInitialStateActive = (activeLinkId) => {
    const navLinksA = [
      "nav-a-home",
      "nav-a-about",
      "nav-a-cal",
      "nav-a-req-phone",
      "nav-a-home-phone",
      "nav-a-cal-phone",
      "nav-a-about-phone",
      "nav-a-tfgs-phone",
      "nav-a-eval-phone",
    ];
    navLinksA.forEach((link) => {
      const anchor = document.getElementById(link);
      if (anchor) {
        if (link === activeLinkId) {
          anchor.classList.add("active");
          anchor.style.textDecoration = "underline";
        } else {
          anchor.classList.remove("active");
          anchor.style.textDecoration = "none";
        }
      }
    });
    // TODO render the image based on the current window
    loadHeaderBackGroundImage(
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
    );
  };

  const pageToActiveLinkDesktop = {
    "/app/about_us.html": "nav-a-about",
    "/app/calendarios.html": "nav-a-cal",
    "/app/home.html": "nav-a-home",
  };

  const pageToActiveLinkPhone = {
    "/app/about_us.html": "nav-a-about-phone",
    "/app/calendarios.html": "nav-a-cal-phone",
    "/app/home.html": "nav-a-home-phone",
    "/app/tfgs_anteriores.html": "nav-a-tfgs-phone",
    "/app/autoevaluacion.html": "nav-a-eval-phone",
    "/app/requisitos_norm.html": "nav-a-req-phone",
  };
  /**
   * Set the inactive state of the navbar
   * @param {NodeListOf<Element>} navLinks - The navigation links
   * @returns {void}
   */
  const setInactiveState = (navLinks) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };
  /**
   * Get the dropdown links
   * @param {NodeListOf<Element>} navLinks - The navigation links
   * @returns {[Element]} The dropdown links
   */
  const getDropdownLinks = (navLinks) => {
    let dropdownLinks = [];
    navLinks.forEach((link) => {
      if (link.classList.contains("dropdown-item")) {
        dropdownLinks.push(link);
      }
    });
    return dropdownLinks;
  };

  const navLinks = document.querySelectorAll(".nav-item");
  const startingActive = document.querySelector(".nav-item.active");
  if (startingActive) {
    startingActive.querySelector("a").style.textDecoration = "underline";
  }
  const currentPath = window.location.pathname;
  let selectedLinkDesktop = pageToActiveLinkDesktop[currentPath];
  let selectedLinkPhone = pageToActiveLinkPhone[currentPath];
  if (pageToActiveLinkDesktop[currentPath]) {
    setInitialStateActive(pageToActiveLinkDesktop[currentPath]);
  }
  if (pageToActiveLinkPhone[currentPath] && getWidthWindow() < 768) {
    setInitialStateActive(pageToActiveLinkPhone[currentPath]);
  }

  if (navLinks.length === 0) {
    loadPageContent("");
  }

  let dropdownLinks = getDropdownLinks(navLinks);
  let hasClickedDropdown = false;
  const anchorActives = [
    document.getElementById("auto-eval-a-nav"),
    document.getElementById("tfgs-a-nav"),
    document.getElementById("requisitos-a-nav"),
  ];

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const currentActive = document.querySelector(".nav-item.active");

      anchorActives.forEach((anchor) => {
        if (anchor.classList.contains("active")) {
          anchor.classList.remove("active");
        }
      });
      if (currentActive && !hasClickedDropdown) {
        currentActive.classList.remove("active");
        currentActive.querySelector("a").style.textDecoration = "none";
      }
      link.classList.add("active");
      const href = link.getAttribute("href");
      window.history.pushState({ path: href }, "", href);
      hasClickedDropdown = true;
      loadPageContent(href);
    });
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const currentActive = document.querySelector(".nav-item.active");
      const underlinedPhone =
        document.getElementById(selectedLinkPhone) || null;
      const underlinedDesktop =
        document.getElementById(selectedLinkDesktop) || null;
      if (underlinedPhone) {
        underlinedPhone.style.textDecoration = "none";
      }
      if (underlinedDesktop) {
        underlinedDesktop.style.textDecoration = "none";
      }
      if (currentActive && !hasClickedDropdown) {
        currentActive.classList.remove("active");
        currentActive.querySelector("a").style.textDecoration = "none";
      }
      if (link.classList.contains("dropdown-item")) {
        return;
      }
      link.classList.add("active");
      link.querySelector("a").style.textDecoration = "underline";
      const href = link.querySelector("a").getAttribute("href");
      window.history.pushState({ path: href }, "", href);
      if (getWidthWindow() > 768) {
        hasClickedDropdown = false;
        anchorActives.forEach((anchor) => {
          if (anchor.classList.contains("active")) {
            anchor.classList.remove("active");
          }
        });
        if (!hasClickedDropdown) {
          setInitialStateActive(link.querySelector("a").id);
        } else {
          setInactiveState(dropdownLinks);
        }
      }
      loadPageContent(href);
    });
  });
}
/**
 * Load the page content based on the navigation
 * @param {string} - The selected window based on navigation
 */
function loadPageContent(href) {
  return new Promise((resolve, reject) => {
    const contentContainer = document.getElementById("content-container");
    fetch(href)
      .then((response) => response.text())
      .then((html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const scripts = tempDiv.querySelectorAll("script");
        scripts.forEach((script) => script.remove());
        resetStateOnLoadPage(tempDiv);

        contentContainer.innerHTML = tempDiv.innerHTML;
        const getCurrentPage = window.location.pathname;
        if (getCurrentPage === "/app/tfgs_anteriores.html") {
          loadTFGSComponents();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        } else if (getCurrentPage === "/app/about_us.html") {
          loadAboutUsComponents();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        } else if (getCurrentPage === "/app/autoevaluacion.html") {
          loadForm();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        }  else if (getCurrentPage === "/app/home.html") {
          loadHomeComponents();
        } else if (getCurrentPage === "/app/calendarios.html") {
            loadCalendarComponents();


        }
        else {
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
          console.log("Setting header");
        }
        setHeader();
        resolve(contentContainer);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Reset the state of the current loaded page
 * @param {HTMLDivElement} tempDiv
 */
const resetStateOnLoadPage = async (tempDiv) => {
  const filterContent = tempDiv.querySelector("#content-container");
  if (filterContent) {
    filterContent.remove();
  }
  const filterNavbar = tempDiv.querySelector("#navbar-container");
  if (filterNavbar) {
    filterNavbar.remove();
  }
  const filterHeader = tempDiv.querySelector("#header-container");
  if (filterHeader) {
    filterHeader.remove();
  }
};

/**
 * Set the header of the pages
 * based on the current window url
 */
function setHeader() {
  const getCurrentPage = window.location.pathname;
  const header = document.getElementById("header-container");
  header.innerHTML = "";
  switch (getCurrentPage) {
    case "/app/home.html":
      header.innerHTML = "<h1>Welcome to Home Page</h1>";
      break;
    case "/app/calendarios.html":
      header.innerHTML = "<h1>Calendarios</h1>";
      break;
    case "/app/about_us.html":
      header.innerHTML = "<h1>About Us</h1>";
      break;
    case "/app/tfgs_anteriores.html":
      header.innerHTML = "<h1>TFG's anteriores</h1>";
      break;
    case "/app/autoevaluacion.html":
      header.innerHTML = "<h1>Cuestionario</h1>";
      break;
    case "/app/":
      header.innerHTML = "<h1>Inicio</h1>";
      break;
    case "/app/index.html":
      header.innerHTML = "<h1>Inicio</h1>";
      break;
    case "/app/requisitos_norm.html":
      header.innerHTML = "<h1>Requisitos y normativas</h1>";
      break;
    default:
      header.innerHTML = "<h1>404 Not Found</h1>";
      break;
  }
}

/**
 * Load the header backgroundImage
 * @param {String} the path/src image to load
 */
const loadHeaderBackGroundImage = (imageHeader) => {
  const navBar = document.getElementById("navbar-container");
  const backGroundImage = document.createElement("img");
  if (navBar.querySelector("#backGroundImage-navbar")) {
    return;
  }
  backGroundImage.id = "backGroundImage-navbar";
  backGroundImage.src = imageHeader;
  backGroundImage.style.width = "100%";
  backGroundImage.style.height = "100%";
  backGroundImage.style.zIndex = "-10";
  navBar.appendChild(backGroundImage);
};
