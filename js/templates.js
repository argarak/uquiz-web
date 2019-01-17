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
}

var templates = new Templates();
