function findParentFromClass(el, className) {
  if (el.parentNode === null || el.parentNode === undefined) {
    return null;
  }

  if (
    el.parentNode.classList === undefined ||
    !el.parentNode.classList.contains(className)
  ) {
    return this.findParentFromClass(el.parentNode, className);
  } else {
    return el.parentNode;
  }
}

function removeModalFromBtn(e) {
  e.stopPropagation();
  e.preventDefault();

  let modalBackground = self.findParentFromClass(e.target, "modalBackground");

  e.target.removeEventListener("click", removeModalFromBtn);
  modalBackground.outerHTML = "";
}

class Modal {
  constructor() {}

  error(msg) {
    let template = `<div class="modalBackground">
                    <div class="modal errorModal">
                         <div class="modalIcon">
                             <img src="icon/alert-circle-outline.svg" alt="error"/>
                         </div>
                         <div class="modalContent">${msg}</div>

                         <button class="modalBtn">OK</button>
                    </div>
                    </div>`;

    document.body.insertAdjacentHTML("beforeend", template);

    let button = document.querySelector(".modalBtn");

    button.addEventListener("click", removeModalFromBtn);
  }

  confirmDelete(msg, questionId, callback, callbackReference) {
    let question = window.quizObject.questions[questionId].text;

    if (!question) {
      question = "New Question";
    }

    let template = `<div class="modalBackground">
                    <div class="modal errorModal">
                         <div class="modalIcon">
                             <img src="icon/alert.svg" alt="error"/>
                         </div>

                         <div class="modalContent">
                             <p>${msg}</p>
                             <p>${question}</p>
                         </div>

                         <button class="modalBtn modalBtnYes">Delete</button>
                         <button class="modalBtn modalBtnNo">Cancel</button>
                    </div>
                    </div>`;

    document.body.insertAdjacentHTML("beforeend", template);

    let buttonNo = document.querySelector(".modalBtnNo");
    buttonNo.addEventListener("click", removeModalFromBtn);

    let buttonYes = document.querySelector(".modalBtnYes");

    buttonYes.addEventListener("click", function(e) {
      callback(callbackReference, questionId);
      removeModalFromBtn(e);
    });
  }

  confirmNew(msg, quizName, newCallback, saveCallback) {
    let template = `<div class="modalBackground">
                    <div class="modal errorModal">
                         <div class="modalIcon">
                             <img src="icon/alert.svg" alt="error"/>
                         </div>

                         <div class="modalContent">
                             <p>${msg}</p>
                             <p>${quizName}</p>
                         </div>

                         <button class="modalBtn modalBtnNew">Create New</button>
                         <button class="modalBtn modalBtnSave">Save & Create New</button>
                         <button class="modalBtn modalBtnCancel">Cancel</button>
                    </div>
                    </div>`;

    document.body.insertAdjacentHTML("beforeend", template);

    let buttonCancel = document.querySelector(".modalBtnCancel");
    buttonCancel.addEventListener("click", removeModalFromBtn);

    let buttonNew = document.querySelector(".modalBtnNew");

    buttonNew.addEventListener("click", function(e) {
      newCallback();
      removeModalFromBtn(e);
    });

    let buttonSave = document.querySelector(".modalBtnSave");

    buttonSave.addEventListener("click", function(e) {
      saveCallback();
      removeModalFromBtn(e);
    });
  }

  confirmOpen(msg, quizName, newCallback, saveCallback) {
    let template = `<div class="modalBackground">
                    <div class="modal errorModal">
                         <div class="modalIcon">
                             <img src="icon/alert.svg" alt="error"/>
                         </div>

                         <div class="modalContent">
                             <p>${msg}</p>
                             <p>${quizName}</p>
                         </div>

                         <button class="modalBtn modalBtnNew">Open</button>
                         <button class="modalBtn modalBtnSave">Save Current & Open</button>
                         <button class="modalBtn modalBtnCancel">Cancel</button>
                    </div>
                    </div>`;

    document.body.insertAdjacentHTML("beforeend", template);

    let buttonCancel = document.querySelector(".modalBtnCancel");
    buttonCancel.addEventListener("click", removeModalFromBtn);

    let buttonNew = document.querySelector(".modalBtnNew");

    buttonNew.addEventListener("click", function(e) {
      newCallback();
      removeModalFromBtn(e);
    });

    let buttonSave = document.querySelector(".modalBtnSave");

    buttonSave.addEventListener("click", function(e) {
      saveCallback();
      removeModalFromBtn(e);
    });
  }
}

var modal = new Modal();
