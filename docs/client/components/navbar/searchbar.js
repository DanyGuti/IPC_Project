// Available values for navigation
const searchValues = [
  {
    Home: "./home.html",
    "About us": "./about_us.html",
    Autoevaluacion: "./autoevaluacion.html",
    "TFG's anteriores": "./tfgs_anteriores.html",
    "Requisitos y normativas": "./requisitos_norm.html",
    Calendarios: "./calendarios.html",
  },
];

export const onFocusSearchBar = () => {
  const imageSearchBar = document.getElementById("img-search-bar");
  const inputSearchBar = document.getElementById("input-search-bar");

  // Focus event, transform and add effect on the x pos direction
  // and reduce the opacity
  inputSearchBar.addEventListener("focus", () => {
    imageSearchBar.style.outline = "none";
    imageSearchBar.style.transition =
      "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
    imageSearchBar.style.transform = "translateX(50px)";
    imageSearchBar.style.opacity = "0";
  });

  // Blur event, return to the original position and opacity
  inputSearchBar.addEventListener("blur", () => {
    imageSearchBar.style.transitionDuration = "0.3s";
    imageSearchBar.style.transform = "translateX(0px)";
    imageSearchBar.style.opacity = "1";
  });
};

export const formSearchBarEvents = () => {
  const formSearchBar = document.getElementById("form-search-bar");
  const searchBarElement = document.getElementById("input-search-bar");
  formSearchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchText = searchBarElement.value;
  });

  searchBarElement.addEventListener("input", (event) => {
    const searchText = event.target.value;
    const ulElement = document.createElement("ul");
    // Remove any existing list before creating a new one
    const existingList = document.getElementById("search-values-list");
    if (existingList) {
      existingList.remove();
    }
    ulElement.id = "search-values-list";
    ulElement.style.position = "absolute";
    ulElement.style.top = "95%";
    ulElement.style.width = "100%";
    ulElement.style.backgroundColor = "white";
    ulElement.style.borderTop = "none";
    ulElement.style.zIndex = "1";
    ulElement.style.padding = "0";
    ulElement.style.margin = "0";
    ulElement.style.listStyleType = "none";
    ulElement.style.boxShadow = "0px 0px 10px 0px black";
    ulElement.style.borderRadius = "0px 0px 10px 10px";
    // Get the li of values that match with the search text
    let possibleValues = [];
    searchValues.forEach((value) => {
      Object.keys(value).forEach((key) => {
        if (
          key.toLowerCase().includes(searchText.toLowerCase()) &&
          searchText
        ) {
          possibleValues.push({ key: key, value: value[key] });
        }
      });
    });

    possibleValues.forEach((value) => {
      const key = value.key;
      const toNavigation = value.value;

      const liElement = document.createElement("li");
      liElement.style.padding = "5%";
      liElement.style.cursor = "pointer";
      liElement.textContent = key;
      liElement.style.position = "relative";
      liElement.style.top = "20%";
      liElement.addEventListener("click", () => {
        window.location.href = toNavigation;
      });
      ulElement.appendChild(liElement);
    });
    formSearchBar.appendChild(ulElement);
  });
};
