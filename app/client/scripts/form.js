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
          const getAllInputs = document.querySelectorAll(".form-check-input");
          let jIndex = 0;
          getAllInputs.forEach(async (input, index) => {
            if (index % 4 === 0 && index != 0) jIndex++;
            if (input.checked && correctResponses[jIndex] === index % 4) {
              validResponses++;
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
  const closeButton = document.getElementById("close-modal-form");
  closeButton.addEventListener("click", async () => {
    bootstrapModal.hide();
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const documentButton = document.getElementById("submit-form-button");
    documentButton.disabled = true;
  });
  modal.addEventListener("hidden.bs.modal", async () => {
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const documentButton = document.getElementById("submit-form-button");
    documentButton.disabled = true;
  });
  const goHomeButton = document.getElementById("home-modal-form");
  goHomeButton.addEventListener("click", async () => {
    bootstrapModal.hide();
    // Reset the form
    validResponses = 0;
    await resetStateForm(form);
    const documentButton = document.getElementById("submit-form-button");
    documentButton.disabled = true;
    window.location.href = "/app/home.html";
  });
};

/**
 * Construct the layout of form for phone
 */
export const constructFormLayoutPhone = () => {
  const containerInnerDiv = document.getElementById("question-container-form");
  questionsAutoEval.forEach((question, index) => {
    // Create a p
    const paragraph = document.createElement("p");
    paragraph.style.fontWeight = "bold";
    paragraph.textContent = `Pregunta ${index + 1}: ${question.question}`;
    paragraph.id = `question-form-${index}`;
    paragraph.style.width = "95%";
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
      input.className = "form-check-input";
      input.required = true;

      // Create a label
      const label = document.createElement("label");
      label.textContent = answer;
      label.className = "form-check-label";
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
  formProgress.style.width = "0%";
  formProgress.textContent = "0%";
  formProgress.setAttribute("aria-valuenow", 0);
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
          formProgress.setAttribute("aria-valuenow", 25 * (acc + 1));
          formProgress.style.width = `${25 * (acc + 1)}%`;
          formProgress.textContent = `${25 * (acc + 1)}%`;
          return acc + 1;
        }
        return acc;
      }, 0);
      if (totalQuestionsChecked === questionsAutoEval.length) {
        documentButton.disabled = false;
        formProgress.style.width = "100%";
        formProgress.textContent = "100%";
        formProgress.setAttribute("aria-valuenow", 100);
      } else {
        documentButton.disabled = true;
      }
    });
  });
};
