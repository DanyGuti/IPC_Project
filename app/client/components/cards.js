import { loadComponent } from "../scripts/main.js";
import { cardPropsBibliographies } from "../../utils/constants.js";
/**
 * Load the card component with the given id into the container with the given id
 * @param {int} idRowLayout - The id of the component to load
 * @param {string} rowLayoutTitle - The string of the container
 * @param {[object]} cardProps - The properties of the card
 */
export async function loadOutCardLayoutTfgs(
  idRowLayout,
  rowLayoutTitle,
  cardProps
) {
  setTimeout(async () => {
    const mainContent = document.getElementById("content-container");
    const headerContainer = document.getElementById("header-container");
    const columnsPerRow = 2;
    headerContainer.zIndex = "100";
    headerContainer.style.position = "absolute";
    mainContent.style.position = "relative";
    mainContent.style.flexDirection = "column";

    const rowContainer = document.createElement("div");
    rowContainer.id = `row-cards-${idRowLayout}`;
    rowContainer.style.display = "flex";
    rowContainer.style.flexDirection = "row";
    rowContainer.style.justifyContent = "flex-start";
    rowContainer.style.gap = "5%";
    rowContainer.style.marginTop = "5%";
    rowContainer.style.marginBottom = "10%";

    const divider = document.createElement("div");
    const paragraph = document.createElement("p");
    divider.style.display = "flex";
    divider.style.flexDirection = "row";
    divider.style.width = "100%";
    paragraph.textContent = rowLayoutTitle;
    paragraph.style.fontSize = "1.5rem";

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.justifyContent = "start";
    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%";
    wrapper.style.height = "60%";
    wrapper.appendChild(rowContainer);
    divider.appendChild(paragraph);
    mainContent.appendChild(divider);

    rowContainer.style.width = "100%";
    rowContainer.style.height = "45%";

    mainContent.appendChild(wrapper);

    for (let i = 0; i < columnsPerRow; i++) {
      await loadComponent("tfgs_card", `row-cards-${idRowLayout}`);
      const card = document.getElementById("card-tfg-phone");
      card.id = `card-tfg-phone-${i}`;
      // Add the cards to the row
      const cardData = cardProps[i];
      const cardImage = card.querySelector("#card-img");
      const cardBody = card.querySelector("#props-card-body");
      cardImage.src = cardData.imageSrc;
      cardBody.querySelector(".card-title").textContent = cardData.title;
      cardBody.querySelector(".card-text").textContent = cardData.text;
      const linkElement = cardBody.querySelector(".text-muted");
      linkElement.innerHTML = `<a href="${cardData.linkUrl}" target="_blank">Ver memoria</a>`;
      rowContainer.appendChild(card);
    }
    const thirdCardRowContainer = document.createElement("div");
    thirdCardRowContainer.id = `row-cards-${idRowLayout}-2`;
    thirdCardRowContainer.style.display = "flex";
    thirdCardRowContainer.style.flexDirection = "row";
    thirdCardRowContainer.alignItems = "center";
    thirdCardRowContainer.style.width = "100%";
    thirdCardRowContainer.style.height = "40%";
    thirdCardRowContainer.style.justifyContent = "center";
    wrapper.appendChild(thirdCardRowContainer);

    // Add the third card below the first two in the middle
    await loadComponent("tfgs_card", `row-cards-${idRowLayout}`);
    const card = document.getElementById("card-tfg-phone");
    card.id = `card-tfg-phone-${idRowLayout}-2`;
    const cardData = cardProps[2];
    const cardImage = card.querySelector("#card-img");
    const cardBody = card.querySelector("#props-card-body");
    cardImage.src = cardData.imageSrc;
    cardBody.querySelector(".card-title").textContent = cardData.title;
    cardBody.querySelector(".card-text").textContent = cardData.text;
    const linkElement = cardBody.querySelector(".text-muted");
    linkElement.innerHTML = `<a href="${cardData.linkUrl}" target="_blank">Ver memoria</a>`;

    thirdCardRowContainer.appendChild(card);
  }, 100);
}

export async function loadOutCardsAboutUs(cardProps) {
  setTimeout(async () => {
    const mainContent = document.getElementById("content-container");
    const headerContainer = document.getElementById("header-container");
    headerContainer.zIndex = "100";
    headerContainer.style.position = "absolute";
    mainContent.style.position = "relative";
    mainContent.style.flexDirection = "column";
    let idRowLayout = 0;
    // Create the Objetivos paragraph
    const objectiveDivider = document.createElement("div");

    // Create the ¿Quiénes somos? title
    const objectiveParagraph = document.createElement("h4");
    objectiveParagraph.textContent = "Objetivos";
    objectiveDivider.style.marginTop = "5%";
    const descriptionObjective = document.createElement("p");
    const descriptionObjective2 = document.createElement("p");
    descriptionObjective.textContent =
      "Mostrar de una manera eficiente, transparente y de fácil acceso a los estudiantes/profesores del tercer grado el proceso de realización del Trabajo de Fin de Grado.";
    // overflow wrap
    descriptionObjective.style.overflowWrap = "break-word";
    descriptionObjective2.style.overflowWrap = "break-word";
    descriptionObjective2.textContent =
      "Facilitar al estudiantado y a los profesores el calendario con las fechas establecidas por la UPV/EHU.";
    // Insert the description of the objective
    objectiveDivider.appendChild(objectiveParagraph);
    objectiveDivider.appendChild(descriptionObjective);
    objectiveDivider.appendChild(descriptionObjective2);
    mainContent.appendChild(objectiveDivider);

    // Inject the bibliographies
    const bibliographies = document.createElement("div");
    bibliographies.style.display = "flex";
    bibliographies.style.flexDirection = "column";
    bibliographies.style.width = "85%";
    bibliographies.style.marginTop = "5%";
    bibliographies.style.justifyContent = "start";
    bibliographies.style.alignItems = "start";

    const bibliographiesTitle = document.createElement("h2");
    bibliographiesTitle.textContent = "Fuentes";
    const ulist = document.createElement("ul");
    ulist.style.display = "flex";
    ulist.style.flexDirection = "column";
    ulist.style.width = "100%";
    ulist.style.justifyContent = "center";
    ulist.style.alignItems = "center";
    // TODO CHANGE THE URLS!!!!
    // TO THE ONES THAT ARE REAL ONES
    cardPropsBibliographies.forEach((element) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = Object.values(element)[0];
      a.textContent = Object.keys(element)[0];
      li.appendChild(a);
      ulist.appendChild(li);
    });
    bibliographies.appendChild(bibliographiesTitle);
    bibliographies.appendChild(ulist);
    mainContent.appendChild(bibliographies);

    const divider = document.createElement("div");
    const paragraph = document.createElement("h2");
    divider.style.display = "flex";
    divider.style.flexDirection = "row";
    divider.style.width = "100%";
    paragraph.textContent = "¿Quiénes somos?";
    paragraph.style.fontSize = "1.5rem";

    divider.appendChild(paragraph);
    mainContent.appendChild(divider);

    const rowContainer = document.createElement("div");
    rowContainer.id = `row-cards-about-${idRowLayout}`;
    rowContainer.style.display = "flex";
    rowContainer.style.flexDirection = "row";
    rowContainer.style.justifyContent = "flex-start";
    rowContainer.style.gap = "5%";
    rowContainer.style.marginTop = "5%";
    rowContainer.style.marginBottom = "5%";
    rowContainer.style.width = "100%";
    rowContainer.style.height = "32%";

    mainContent.appendChild(rowContainer);

    for (let i = 0; i < 2; i++) {
      await loadComponent("about_us_card", `row-cards-about-${idRowLayout}`);
      const card = document.getElementById("card-about-phone");
      card.id = `card-about-phone-${i}`;
      const cardData = cardProps[i];
      const cardImage = card.querySelector("#card-img");
      const cardBody = card.querySelector("#props-card-body");
      cardImage.src = cardData.imageSrc;
      cardBody.querySelector(".card-text").textContent = cardData.name;
    }
    idRowLayout++;
    const rowContainer2 = document.createElement("div");
    rowContainer2.id = `row-cards-about-${idRowLayout}`;
    rowContainer2.style.display = "flex";
    rowContainer2.style.flexDirection = "row";
    rowContainer2.style.justifyContent = "flex-start";
    rowContainer2.style.gap = "5%";
    rowContainer2.style.marginTop = "5%";
    rowContainer2.style.marginBottom = "10%";
    rowContainer2.style.width = "100%";
    rowContainer2.style.height = "32%";
    mainContent.appendChild(rowContainer2);
    for (let i = 2; i < cardProps.length; i++) {
      await loadComponent("about_us_card", `row-cards-about-${idRowLayout}`);
      const card = document.getElementById("card-about-phone");
      card.id = `card-about-phone-${i}`;
      const cardData = cardProps[i];
      const cardImage = card.querySelector("#card-img");
      const cardBody = card.querySelector("#props-card-body");
      cardImage.src = cardData.imageSrc;
      cardBody.querySelector(".card-text").textContent = cardData.name;
    }
  }, 100);
}
