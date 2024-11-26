import {
  loadTFGSComponents,
  loadAboutUsComponents,
  loadForm,
  loadCalendars,
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
    const navLinksDropdown = [
      "auto-eval-a-nav",
      "tfgs-a-nav",
      "requisitos-a-nav",
    ];
    if (
      (getWidthWindow() > 768 && activeLinkId === "nav-a-eval") ||
      activeLinkId === "nav-a-tfgs" ||
      activeLinkId === "nav-a-req"
    ) {
      const mappingDesktop = {
        "nav-a-eval": "auto-eval-a-nav",
        "nav-a-tfgs": "tfgs-a-nav",
        "nav-a-req": "requisitos-a-nav",
      };
      const parentAnchor = document.getElementById("a-toggler-dropdown");
      if (parentAnchor) {
        parentAnchor.style.textDecoration = "underline";
      }
      navLinksDropdown.forEach((link) => {
        const anchor = document.getElementById(link);
        if (anchor) {
          if (link === mappingDesktop[activeLinkId]) {
            anchor.classList.add("active");
          } else {
            anchor.classList.remove("active");
          }
        }
      });
    }
    navLinksA.forEach((link) => {
      const anchor = document.getElementById(link);
      if (anchor) {
        if (link === activeLinkId) {
          anchor.classList.add("active");
          anchor.style.textDecoration = "underline";
          anchor.style.opacity = "1";
        } else {
          anchor.classList.remove("active");
          anchor.style.textDecoration = "none";
          anchor.style.opacity = "0.5";
        }
      }
    });
    // TODO render the image based on the current window
    loadHeaderBackGroundImage(
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
    );
  };

  const pageToActiveLinkDesktop = {
    "/IPC_Project/app/about_us.html": "nav-a-about",
    "/IPC_Project/app/calendarios.html": "nav-a-cal",
    "/IPC_Project/app/home.html": "nav-a-home",
  };

  const pageToActiveLinkPhone = {
    "/IPC_Project/app/about_us.html": "nav-a-about-phone",
    "/IPC_Project/app/calendarios.html": "nav-a-cal-phone",
    "/IPC_Project/app/home.html": "nav-a-home-phone",
    "/IPC_Project/app/tfgs_anteriores.html": "nav-a-tfgs-phone",
    "/IPC_Project/app/autoevaluacion.html": "nav-a-eval-phone",
    "/IPC_Project/app/requisitos_norm.html": "nav-a-req-phone",
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
    startingActive.querySelector("a").style.opacity = "1";
  }
  const currentPath = window.location.pathname;
  let selectedLinkDesktop = pageToActiveLinkDesktop[currentPath];
  let selectedLinkPhone = pageToActiveLinkPhone[currentPath];
  if (!selectedLinkDesktop && selectedLinkPhone && getWidthWindow() > 768) {
    let selectedLinkDesktopNotNull = pageToActiveLinkPhone[currentPath];
    switch (selectedLinkDesktopNotNull) {
      case "nav-a-about-phone":
        selectedLinkDesktopNotNull = "nav-a-about";
        break;
      case "nav-a-cal-phone":
        selectedLinkDesktopNotNull = "nav-a-cal";
        break;
      case "nav-a-home-phone":
        selectedLinkDesktopNotNull = "nav-a-home";
        break;
      case "nav-a-tfgs-phone":
        selectedLinkDesktopNotNull = "nav-a-tfgs";
        break;
      case "nav-a-eval-phone":
        selectedLinkDesktopNotNull = "nav-a-eval";
        break;
      case "nav-a-req-phone":
        selectedLinkDesktopNotNull = "nav-a-req";
        break;
      default:
        selectedLinkDesktopNotNull = "nav-a-home";
        break;
    }
    pageToActiveLinkDesktop[currentPath] = selectedLinkDesktopNotNull;
  }
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
        if (currentActive.querySelector("a")) {
          currentActive.querySelector("a").style.textDecoration = "none";
          currentActive.querySelector("a").style.opacity = "0.5";
        }
      }
      link.classList.add("active");
      // get parent node and add style
      const parentAnchor = document.getElementById("a-toggler-dropdown");
      parentAnchor.style.textDecoration = "underline";
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
        underlinedPhone.style.opacity = "0.5";
      }
      if (underlinedDesktop) {
        underlinedDesktop.style.textDecoration = "none";
        underlinedDesktop.style.opacity = "0.5";
      }
      if (currentActive && !hasClickedDropdown) {
        currentActive.classList.remove("active");
        if (currentActive.querySelector("a")) {
          currentActive.querySelector("a").style.textDecoration = "none";
          currentActive.querySelector("a").style.opacity = "0.5";
        }
        if (getWidthWindow() > 768) {
          const parentAnchor = document.getElementById("a-toggler-dropdown");
          parentAnchor.style.textDecoration = "none";
        }
      }
      if (link.classList.contains("dropdown-item")) {
        return;
      }
      link.classList.add("active");
      link.querySelector("a").style.textDecoration = "underline";
      link.querySelector("a").style.opacity = "1";
      if (getWidthWindow() > 768) {
        const parentAnchor = document.getElementById("a-toggler-dropdown");
        parentAnchor.style.textDecoration = "none";
      }
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
        if (getCurrentPage === "/IPC_Project/app/tfgs_anteriores.html") {
          loadTFGSComponents();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        } else if (getCurrentPage === "/IPC_Project/app/about_us.html") {
          loadAboutUsComponents();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        } else if (getCurrentPage === "/IPC_Project/app/autoevaluacion.html") {
          loadForm();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
        } else if (getCurrentPage === "/app/calendarios.html") {
          loadCalendars();
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
          // Apply all the styles to the calendars:
          // const calendarContainer =
          //   document.getElementById("phone-calendars");
          // if (calendarContainer) {
        } else {
          loadHeaderBackGroundImage(
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D"
          );
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
  header.style.textAlign = "center";
  header.style.marginTop = "5%";
  switch (getCurrentPage) {
    case "/IPC_Project/app/home.html":
      header.innerHTML = "<h1>Welcome to Home Page</h1>";
      break;
    case "/IPC_Project/app/calendarios.html":
      header.innerHTML = "<h1>Calendarios</h1>";
      break;
    case "/IPC_Project/app/about_us.html":
      header.innerHTML = "<h1>About Us</h1>";
      break;
    case "/IPC_Project/app/tfgs_anteriores.html":
      header.innerHTML = "<h1>TFG's anteriores</h1>";
      break;
    case "/IPC_Project/app/autoevaluacion.html":
      header.innerHTML = "<h1>Cuestionario</h1>";
      break;
    case "/IPC_Project/app/":
      header.innerHTML = "<h1>Inicio</h1>";
      break;
    case "/IPC_Project/app/index.html":
      header.innerHTML = "<h1>Inicio</h1>";
      break;
    case "/IPC_Project/app/requisitos_norm.html":
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
  backGroundImage.style.height = getWidthWindow() < 768 ? "100%" : "450px";
  backGroundImage.style.zIndex = "-10";
  backGroundImage.style.objectFit = "cover";
  navBar.appendChild(backGroundImage);
};
