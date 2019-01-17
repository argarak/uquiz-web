/* Defines all templates to be used inside of the application */

class Templates {
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
}

var templates = new Templates();
