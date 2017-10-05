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
    quizScore.innerHTML = `Good Work! You Got: ${score} / ${total}! Pick a New Deck for a New Quiz`
  }
}

function gotItWrong() {
  total++;
  if (total !== totalCards) {
    quizScore.innerHTML = `Your Score: ${score} / ${total}`
  } else {
    quizScore.innerHTML = `Good Work! You Got: ${score} / ${total}! Pick a New Deck for a New Quiz `
  }
}

function showAnswer(button) {
  button.previousElementSibling.style.color = "blue";
}
