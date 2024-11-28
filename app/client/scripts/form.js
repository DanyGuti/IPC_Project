import { questionsAutoEval } from "../../utils/questions.js";
import { loadComponent } from "./main.js";

/**
 * Bootstrap form validation
 */
export const formValidation = () => {
  (function () {
    "use strict";
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");
    const correctResponses = questionsAutoEval.map((question) => {
      return question.correct;
    });
    let validResponses = 0;
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(async (form) => {
      form.addEventListener(
        "submit",
        async function (event) {
          if (!form.checkValidity()) {
            event.stopPropagation();
          }
          event.preventDefault();
          // Clear previous validation messages
          const allValidationDivs = document.querySelectorAll(
            ".validation-message"
          );
          allValidationDivs.forEach((div) => div.remove());
          const getAllInputs = document.querySelectorAll(".form-check-input");
          let jIndex = 0;
          let shownCorrectForQuestion = {};
          getAllInputs.forEach((input, index) => {
            const parentDiv =
              input.closest(".form-group") || input.parentElement;

            const questionIndex = Math.floor(index / 4);
            if (!shownCorrectForQuestion[questionIndex]) {
              shownCorrectForQuestion[questionIndex] = false;
            }
            if (shownCorrectForQuestion[questionIndex]) return;
            if (index % 4 === 0 && index != 0) jIndex++;
            if (input.checked && correctResponses[jIndex] === index % 4) {
              validResponses++;
              const correctInput = getAllInputs[jIndex * 4 + (index % 4)];
              correctInput.style.border = "2px solid green";
              addValidationMessage(parentDiv, "¡Has acertado!", "valid");
              shownCorrectForQuestion[questionIndex] = true;
            }
            if (input.checked && correctResponses[jIndex] !== index % 4) {
              const correctInput =
                getAllInputs[jIndex * 4 + correctResponses[jIndex]];
              correctInput.style.border = "2px solid green";
              input.style.border = "2px solid red";
              addValidationMessage(
                parentDiv,
                "Respuesta incorrecta, intenta de nuevo",
                "invalid"
              );
            }
          });
          await loadComponent("modal_auto_eval", "content-container");
          await postFormSubmit(validResponses, form);
        },
        false
      );
    });
  })();
};

/** Post submit form
 * @param {int} validResponses - Number of valid responses
 * @param {HTMLElement} form - Form element
 */
const postFormSubmit = async (validResponses, form) => {
  // Load the results from the modal
  const modal = document.getElementById("exampleModal");
  const modalContent = document.getElementById("modal-body-content");
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.textContent = "Resultados";
  modalContent.innerHTML = `<p>Respuestas correctas: ${validResponses}</p>`;
  // show the modal
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
  // Close the modal

  const buttonShowResults = document.createElement("button");
  buttonShowResults.textContent = "Respuestas";
  buttonShowResults.className = "btn btn-info";
  buttonShowResults.id = "show-results-button";

  buttonShowResults.addEventListener("click", async (event) => {
    const clickedButton = event.target;
    console.log(clickedButton);
    if (clickedButton.id === "show-results-button") {
      const submitButton = document.getElementById("submit-form-button");
      submitButton.remove();
      bootstrapModal.hide();
      form.classList.add("was-validated");
      const allInputs = document.querySelectorAll(".form-check-input");
      allInputs.forEach((input) => {
        input.disabled = true;
      });
      const newButton = document.createElement("button");
      newButton.textContent = "Volver a intentar";
      newButton.className = "btn btn-primary";
      const contForm = document.getElementById("form-eval");
      newButton.addEventListener("click", async (event) => {
        bootstrapModal.hide();
        // Reset the form
        window.location.reload();
        newButton.remove();
      });
      contForm.appendChild(newButton);
      return;
    }
  });

  // append the button to the modal
  modalContent.appendChild(buttonShowResults);
  const closeButton = document.getElementById("close-modal-form");
  closeButton.addEventListener("click", async (event) => {
    console.log("close button", event.target);
    bootstrapModal.hide();
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const inputs = document.querySelectorAll(".form-check-input");
    inputs.forEach((input) => {
      input.style.border = "1px solid #ced4da";
    });
    // get all class name divs validations and remove them
    const allValidationDivs = document.querySelectorAll(".validation-feedback");
    allValidationDivs.forEach((div) => div.remove());

    const documentButton = document.getElementById("submit-form-button");
    if (documentButton) documentButton.disabled = true;
  });
  modal.addEventListener("hidden.bs.modal", async () => {
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const documentButton = document.getElementById("submit-form-button");
    if (documentButton) documentButton.disabled = true;
  });
  const goHomeButton = document.getElementById("home-modal-form");
  goHomeButton.addEventListener("click", async (event) => {
    bootstrapModal.hide();
    console.log("home button", event.target);
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const documentButton = document.getElementById("submit-form-button");
    if (documentButton) documentButton.disabled = true;
    window.location.href = "/IPC_Project/app/home.html";
  });
};

/**
 * Construct the layout of form for phone
 */
export const constructFormLayoutPhone = () => {
  const containerInnerDiv = document.getElementById("question-container-form");
  const descriptionForm = document.createElement("h3");
  descriptionForm.textContent =
    "Contesta las siguientes preguntas para autoevaluar tus conocimientos, no podrás ver los resultados hasta que hayas contestado todas las preguntas.";
  descriptionForm.style.fontWeight = "300";
  descriptionForm.style.marginBottom = "5%";
  descriptionForm.style.marginTop = "5%";
  descriptionForm.style.width = "90%";
  containerInnerDiv.appendChild(descriptionForm);
  questionsAutoEval.forEach((question, index) => {
    const paragraph = document.createElement("p");
    paragraph.style.fontWeight = "660";
    paragraph.textContent = `Pregunta ${index + 1}: ${question.question}`;
    paragraph.id = `question-form-${index}`;
    paragraph.style.width = "95%";
    paragraph.style.fontSize = "1.4rem";
    const asterisk = document.createElement("span");
    asterisk.textContent = " *";
    asterisk.style.color = "red";
    paragraph.appendChild(asterisk);
    // Creata a div struct for each of the answers
    containerInnerDiv.appendChild(paragraph);
    question.answers.forEach((answer, indexAns) => {
      const div = document.createElement("div");
      div.id = `answer-form-${index}-answer-${indexAns}`;
      div.style.display = "flex";
      div.style.flexDirection = "row";
      div.style.justifyContent = "start";
      div.style.marginLeft = "5%";
      div.style.gap = "2%";
      div.style.width = "85%";
      div.style.padding = "5px";
      // Create an input
      const input = document.createElement("input");
      input.type = "radio";
      input.id = `input-form-${index}-answer-${indexAns}`;
      input.name = `input-form-${index}`;
      input.style.width = "20px";
      input.style.height = "20px";
      input.style.fontSize = "1.3rem";
      input.className = "form-check-input";
      input.required = true;

      // Create a label
      const label = document.createElement("label");
      label.textContent = answer;
      label.className = "form-check-label";
      label.style.fontSize = "1.1rem";
      label.htmlFor = `input-form-${index}-answer-${indexAns}`;

      // Append the input and label to the div
      div.appendChild(input);
      div.appendChild(label);
      // Append the paragraph and div to the container
      containerInnerDiv.appendChild(div);
    });
    // Empty div as divider
    const divider = document.createElement("div");
    divider.style.width = "90%";
    divider.style.height = "2px";
    divider.style.backgroundColor = "black";
    divider.style.marginTop = "5%";
    divider.style.marginBottom = "5%";
    divider.style.marginRight = "10%";
    divider.style.opacity = "0.5";
    containerInnerDiv.appendChild(divider);
  });
};

const resetStateForm = async (form) => {
  const formInputs = document.querySelectorAll(".form-check-input");
  const formProgress = document.getElementById("progress-container");
  formInputs.forEach(async (input) => {
    input.checked = false;
  });
  form.classList.remove("was-validated");
  form.reset();
  await observeChangesForm();
  if (formProgress) {
    formProgress.setAttribute("aria-valuenow", 0);
    formProgress.style.width = "0%";
    formProgress.textContent = "0%";
  }
};

/**
 * Observe the changes for the form based on
 * the input from the user
 */
export const observeChangesForm = async () => {
  const forms = document.querySelectorAll(".form-check-input");
  const formProgress = document.getElementById("progress-container");
  let totalQuestionsChecked = 0;
  const documentButton = document.getElementById("submit-form-button");
  let indexesAnswers = Array(forms.length).fill(false);
  // 0-3 makes index 0
  // 4-7 makes index 1
  // 8-11 makes index 2
  // 12-15 makes index 3
  forms.forEach((input, idx) => {
    input.addEventListener("change", (event) => {
      const index = Math.floor(idx / 4);
      if (event.target.checked && !indexesAnswers[index]) {
        indexesAnswers[index] = true;
      } else {
        event.target.checked = false;
        indexesAnswers[index] = false;
      }
      totalQuestionsChecked = indexesAnswers.reduce((acc, curr) => {
        if (curr) {
          if (formProgress) {
            formProgress.setAttribute("aria-valuenow", 25 * (acc + 1));
            formProgress.style.width = `${25 * (acc + 1)}%`;
            formProgress.textContent = `${25 * (acc + 1)}%`;
          }
          return acc + 1;
        }
        return acc;
      }, 0);
      if (totalQuestionsChecked === questionsAutoEval.length) {
        documentButton.disabled = false;
        if (formProgress) {
          formProgress.setAttribute("aria-valuenow", 100);
          formProgress.style.width = "100%";
          formProgress.textContent = "100%";
        }
      } else {
        documentButton.disabled = true;
      }
    });
  });
};

/**
 * Function to add validation message below the input
 * @param {HTMLElement} parentDiv - The parent container for the input
 * @param {string} message - The message to display
 * @param {string} type - The type of message: "valid" or "invalid"
 */
const addValidationMessage = (parentDiv, message, type) => {
  const validationDiv = document.createElement("div");
  validationDiv.className = `validation-feedback ${type}`;
  validationDiv.textContent = message;
  validationDiv.style.color = type === "valid" ? "green" : "red";
  validationDiv.style.marginTop = "5px";
  parentDiv.appendChild(validationDiv);
};
