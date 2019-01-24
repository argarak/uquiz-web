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

  generateCorrectAnswerMsg() {
    let correctAnswers = [];
    let correctAnswerMsg = "";

    for (let choice of window.quizObject.questions[window.currentQuestion]
      .choices) {
      if (choice.correct) {
        correctAnswers.push(choice);
      }
    }

    if (correctAnswers.length === 0) {
      correctAnswerMsg = "There were no correct answers.";
    } else if (correctAnswers.length === 1) {
      correctAnswerMsg =
        'The correct answer is "' + correctAnswers[0].text + '".';
    } else {
      correctAnswerMsg = "Correct answers are ";

      for (let i = 0; i < correctAnswers.length; i++) {
        if (i === correctAnswers.length - 1) {
          correctAnswerMsg += '"' + correctAnswers[i].text + '".';
        } else {
          correctAnswerMsg += '"' + correctAnswers[i].text + '", ';
        }
      }
    }

    return correctAnswerMsg;
  }

  correct(selected) {
    this.clearContent();

    this.contentContainer.insertAdjacentHTML(
      "beforeend",
      templates.correct("Correct!", 'You selected "' + selected + '".')
    );

    let continueQuestionBtn = document.getElementById("continueQuestionBtn");

    var self = this;

    continueQuestionBtn.addEventListener("click", function(event) {
      if (window.currentQuestion === window.quizObject.questions.length - 1) {
        self.endQuiz();
      } else {
        window.currentQuestion++;
        self.presentQuestion();
      }
    });
  }

  incorrect(selectedParam) {
    let selected = '"' + selectedParam + '"';

    this.clearContent();
    let correctAnswerMsg = this.generateCorrectAnswerMsg();

    if (selectedParam === "") {
      this.contentContainer.insertAdjacentHTML(
        "beforeend",
        templates.incorrect("You did not select an answer.", correctAnswerMsg)
      );
    } else {
      this.contentContainer.insertAdjacentHTML(
        "beforeend",
        templates.incorrect("You selected " + selected + ".", correctAnswerMsg)
      );
    }

    let continueQuestionBtn = document.getElementById("continueQuestionBtn");

    var self = this;

    continueQuestionBtn.addEventListener("click", function(event) {
      if (window.currentQuestion === window.quizObject.questions.length - 1) {
        self.endQuiz();
      } else {
        window.currentQuestion++;
        self.presentQuestion();
      }
    });
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

    let nextQuestionBtn = document.getElementById("nextQuestionBtn");

    var self = this;

    nextQuestionBtn.addEventListener("click", function(event) {
      let choices = document.querySelectorAll(".choice");
      let selectedChoice = -1;

      for (let i = 0; i < 4; i++) {
        let checked = choices[i].querySelector("input").checked;

        if (checked === true) {
          selectedChoice = i;
          break;
        }
      }

      if (selectedChoice === -1) {
        self.incorrect("");
        return;
      }

      let choiceObject =
        window.quizObject.questions[window.currentQuestion].choices[
          selectedChoice
        ];

      if (choiceObject.correct) {
        window.correctList.push(window.currentQuestion);
        self.correct(choiceObject.text);
      } else {
        self.incorrect(choiceObject.text);
      }
    });
  }

  presentQuestion() {
    this.clearContent();

    var self = this;

    self.contentContainer.insertAdjacentHTML(
      "beforeend",
      templates.questionStart(
        window.quizObject.questions[window.currentQuestion].text,
        window.currentQuestion + 1
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
      250
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
      window.currentQuestion = 0;
      self.presentQuestion();
    });
  }
}

var action = new Action();
