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

function getWidthWindow() {
  return window.innerWidth;
}

export function closeBurger() {
  var sidenav = document.getElementById("sidenav-1");
  var sidenavToggler = document.getElementById("sidenav-toggler");
  var sidenavCloser = document.getElementById("sidenav-closer");

  sidenav.style.left = "-50%";
  sidenavToggler.style.display = "block";
  sidenavCloser.style.display = "none";
}

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

export function setNavbarActives() {
  const getDropdownLinks = (navLinks) => {
    let dropdownLinks = [];
    navLinks.forEach((link) => {
      if (link.classList.contains("dropdown-item")) {
        dropdownLinks.push(link);
      }
    });
    return dropdownLinks;
  };
  const setInitialStateActive = (activeLinkId) => {
    const navLinksA = ["nav-a-home", "nav-a-about", "nav-a-cal"];
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
  };

  const setInactiveState = (navLinks) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  const navLinks = document.querySelectorAll(".nav-item");
  const startingActive = document.querySelector(".nav-item.active");
  if (startingActive) {
    startingActive.querySelector("a").style.textDecoration = "underline";
  }
  const pageToActiveLink = {
    "/app/about_us.html": "nav-a-about",
    "/app/calendarios.html": "nav-a-cal",
    "/app/home.html": "nav-a-home",
  };
  const currentPath = window.location.pathname;
  if (pageToActiveLink[currentPath]) {
    setInitialStateActive(pageToActiveLink[currentPath]);
  }

  if (navLinks.length === 0) {
    loadPageContent("");
  }

  let dropdownLinks = getDropdownLinks(navLinks);
  let hasClickedDropdown = false;
  const anchorActive = document.getElementById("auto-eval-a-nav");
  const anchorActive2 = document.getElementById("tfgs-a-nav");
  const anchorActive3 = document.getElementById("requisitos-a-nav");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const currentActive = document.querySelector(".nav-item.active");
      if (anchorActive.classList.contains("active")) {
        anchorActive.classList.remove("active");
      }
      if (anchorActive2.classList.contains("active")) {
        anchorActive2.classList.remove("active");
      }
      if (anchorActive3.classList.contains("active")) {
        anchorActive3.classList.remove("active");
      }
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
        anchorActive.classList.remove("active");
        anchorActive2.classList.remove("active");
        anchorActive3.classList.remove("active");
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

function loadPageContent(href) {
  document.getElementById("content-container").innerHTML = "";
  fetch(href)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-container").innerHTML = html;
      setHeader();
    });
}

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
      header.innerHTML = "<h1>Autoevalúate</h1>";
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
