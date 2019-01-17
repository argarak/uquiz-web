class Action {
  constructor() {
    this.contentContainer = document.getElementById("contentContainer");

    if (this.contentContainer === null) {
      console.error("#contentContainer could not be found!");
      return;
    }
  }

  clearContent() {
    this.contentContainer.innerHTML = "";
  }

  welcomeQuiz() {
    this.contentContainer.insertAdjacentHTML(
      "beforeend",
      templates.quizWelcome(
        window.quizObject.name,
        window.quizObject.author,
        window.quizObject.date
      )
    );

    let playBtn = document.getElementById("welcomePlayBtn");

    playBtn.addEventListener("click", function(event) {
      console.log("play button pressed");
    });
  }
}

var action = new Action();
