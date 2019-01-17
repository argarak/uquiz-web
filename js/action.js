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

    var self = this;

    playBtn.addEventListener("click", function(event) {
      self.clearContent();
      window.currentQuestion = 0;

      self.contentContainer.insertAdjacentHTML(
        "beforeend",
        templates.questionStart(
          window.quizObject.questions[window.currentQuestion].text,
          window.currentQuestion
        )
      );
    });
  }
}

var action = new Action();
