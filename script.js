const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const settingsBtn = document.querySelector("#settings-btn");
const difficultySelect = document.querySelector("#difficulty");
const settingsForm = document.querySelector("#settings-form");
const settings = document.querySelector("#settings");
const endGameEl = document.querySelector("#end-game-container");

/* const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
]; */

let randomWord;
let score = 0;
let time = 30;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

const randomWordApi = "https://random-word-api.herokuapp.com/word";

/* function getRandomWord() {
  let randomIdx = Math.floor(Math.random() * words.length);
  randomWord = words[randomIdx];
  word.innerHTML = randomWord;
} */

function getRandomWord() {
    fetch(randomWordApi)
    .then((response) => response.json())
    .then(data => {
        randomWord = data[0];
        word.innerHTML = randomWord;
    })    
}

function gameOver() {
  endGameEl.innerHTML = `
        <h1>Time ran out!</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
  endGameEl.style.display = "flex";
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

let timeInterval = setInterval(updateTime, 1000);

text.addEventListener("input", (e) => {
  const typedText = e.target.value;
  if (typedText === randomWord) {
    updateScore();
    getRandomWord();

    e.target.value = "";
    if (difficulty === "hard") {
        time += 2;
    } else if (difficulty === "medium") {
        time += 3;
    } else {
        time += 5;
    }
  }
});

getRandomWord();

//toggle settings visibility
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

//homework
//get all words from https://random-word-api.herokuapp.com/all and store locally 
//get random word from local database