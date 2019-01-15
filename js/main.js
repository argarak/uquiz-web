document.addEventListener("DOMContentLoaded", function(event) {
  window.quizFile = "";

  window.quizObject = {
    name: "New Quiz",
    author: "",
    date: "",
    questions: [
      {
        text: "New Question",
        choices: [
          {text: "", correct: false},
          {text: "", correct: false},
          {text: "", correct: false},
          {text: "", correct: false}
        ]
      }
    ]
  };

  var fileupload = document.getElementById("inputfile");

  fileupload.addEventListener("input", function(e) {
    if (this.files[0].size > 3e6) {
      modal.error("Files must be under 3MB");
      return;
    } else if (
      this.files[0].type !== "application/json" &&
      this.files[0].type !== "text/plain"
    ) {
      modal.error("Not a valid JSON or text file");
      return;
    }

    var reader = new FileReader();

    reader.onload = function() {
      var text = reader.result;

      window.quizObject = JSON.parse(text);
      console.log(window.quizObject);
    };

    reader.readAsText(this.files[0]);
  });

  let openBtn = document.querySelector(".openControl");

  if (openBtn === null) {
    console.error("openBtn is null, check querySelector!");
  } else {
    document.addEventListener("click", function(e) {
      fileupload.click();
    });
  }
});
