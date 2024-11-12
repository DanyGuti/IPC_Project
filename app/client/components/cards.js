import { loadComponent } from "../scripts/main.js";
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
