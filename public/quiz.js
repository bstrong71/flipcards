// show answer by changing color of text

let score = 0;
let total = 0;
let quizScore = document.querySelector(".score");
let quizCard = document.getElementsByClassName("eachQuizCard");
let totalCards = quizCard.length;

function gotItRight() {
  score++;
  total++;
  if (total !== totalCards) {
    quizScore.innerHTML = `Your Score: ${score} / ${total}`
  } else {
    quizScore.innerHTML = `Thanks for Playing! You Got: ${score} / ${total}!`
  }
}

function gotItWrong() {
  total++;
  if (total !== totalCards) {
    quizScore.innerHTML = `Your Score: ${score} / ${total}`
  } else {
    quizScore.innerHTML = `Thanks for Playing! You Got: ${score} / ${total}!`
  }
}

function showAnswer(button) {
  button.previousElementSibling.style.color = "blue";
}
