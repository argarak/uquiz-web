/* Defines all templates to be used inside of the application */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Templates {
  constructor() {
    this.palette = [
      "F44336",
      "E91E63",
      "9C27B0",
      "673AB7",
      "3F51B5",
      "2196F3",
      "03A9F4",
      "00BCD4",
      "009688",
      "4CAF50",
      "8BC34A",
      "CDDC39",
      "FFEB3B",
      "FFC107",
      "FF9800",
      "FF5722"
    ];
  }

  quizWelcome(quizName, quizAuthor, quizDate) {
    return `

<div id="quizWelcome">

<div id="quizWelcomeInfo">
  <div id="welcomeQuizName"><h1>${quizName}</h1></div>
  <div id="welcomeQuizAuthor"><h2>by ${quizAuthor}</h2></div>
  <div id="welcomeQuizDate"><h3>${quizDate}</h3></div>
</div>

<div id="quizWelcomeControls">
  <button id="welcomePlayBtn" class="btn">Play</button>
</div>

</div>

    `;
  }

  questionStart(questionText, questionIndex) {
    let colour = this.palette[getRandomIntInclusive(0, this.palette.length)];

    return `

<div id="questionStart" style="background-color: #${colour};">

<h3 id="questionStartIndex">Question ${questionIndex}</h2>
<h1 id="questionStartText">${questionText}</h1>

</div>

    `;
  }

  showQuestion(question, index) {
    return `

<div id="showQuestionContainer">

<div id="showQuestionText">
${question.text}
</div>

<div id="choicesContainer">

<div class="choice">
  <div class="choiceControl">
    <input type="radio" id="choice1" name="choices" value="${
      question.choices[0].text
    }">
    <label for="choice1">${question.choices[0].text}</label>
  </div>
</div>

<div class="choice">
  <div class="choiceControl">
    <input type="radio" id="choice2" name="choices" value="${
      question.choices[1].text
    }">
    <label for="choice2">${question.choices[1].text}</label>
  </div>
</div>

<div class="choice">
  <div class="choiceControl">
    <input type="radio" id="choice3" name="choices" value="${
      question.choices[2].text
    }">
    <label for="choice3">${question.choices[2].text}</label>
  </div>
</div>

<div class="choice">
  <div class="choiceControl">
    <input type="radio" id="choice4" name="choices" value="${
      question.choices[3].text
    }">
    <label for="choice4">${question.choices[3].text}</label>
  </div>
</div>

</div>

<div id="choiceControlsContainer">
  <button id="nextQuestionBtn" class="btn">Next</button>
</div>

</div>
    `;
  }

  incorrect(msg, correctAnswer) {
    return `

<div id="showIncorrectContainer">

<div id="incorrectIconContainer">
<img src="icon/incorrect.svg" alt="incorrect icon"/>
</div>

<div id="incorrectMessageContainer">

<div id="incorrectMessage">
${msg}
</div>

<div id="correctAnswer">
${correctAnswer}
</div>

</div>

<div id="incorrectControlContainer">
  <button id="continueQuestionBtn" class="btn">Continue</button>
</div>

</div>

    `;
  }

  correct(msg, correctAnswer) {
    return `

<div id="showCorrectContainer">

<div id="incorrectIconContainer">
<img src="icon/correct.svg" alt="correct icon"/>
</div>

<div id="correctMessageContainer">

<div id="correctMessage">
${msg}
</div>

<div id="correctAnswer">
${correctAnswer}
</div>

</div>

<div id="correctControlContainer">
  <button id="continueQuestionBtn" class="btn">Continue</button>
</div>

</div>

    `;
  }

  endQuiz() {
    return `

<div id="endQuizContainer">



</div>

    `;
  }
}

var templates = new Templates();
