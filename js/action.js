class Action {
  constructor() {
    this.contentContainer = document.getElementById("contentContainer");
    this.progressContainer = document.getElementById("progressContainer");
    this.progress = document.querySelector(".progress");

    if (this.contentContainer === null) {
      console.error("#contentContainer could not be found!");
      return;
    }
  }

  clearContent() {
    this.contentContainer.innerHTML = "";
  }

  updateProgress(percentage) {
    this.progress.style.width = percentage + "%";
  }

  hideProgress() {
    this.progressContainer.style.display = "none";
  }

  showProgress() {
    this.progressContainer.style.display = "flex";
  }

  showQuestion() {
    this.clearContent();

    this.contentContainer.insertAdjacentHTML(
      "beforeend",
      templates.showQuestion(
        window.quizObject.questions[window.currentQuestion],
        window.currentQuestion
      )
    );
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

      self.showProgress();

      window.welcomeProgressPercentage = 0;
      window.welcomeProgressTimeout = window.setInterval(
        function() {
          if (window.welcomeProgressPercentage === 100) {
            self.hideProgress();
            self.updateProgress(0);
            window.welcomeProgressPercentage = 0;

            window.clearInterval(window.welcomeProgressTimeout);

            self.showQuestion(window.currentQuestion);
          }
          window.welcomeProgressPercentage += 10;
          self.updateProgress(window.welcomeProgressPercentage);
        }.bind(self),
        500
      );
    });
  }
}

var action = new Action();
