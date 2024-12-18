//Accessing HTML elements

const startGameScreen = document.getElementById("start-game-container");
const startGameBtn = document.getElementById("start-game-btn");

const userGuess = document.getElementById("guess");
const submitBtn = document.getElementById("submit-btn");
const scrambledWordContainer = document.getElementById("scrambled-word");
const timerElement = document.getElementById("timer");
const statusContainer = document.getElementById("status-container");
const inputContainer = document.getElementById("word-guess-container");
const scoreContainer = document.getElementById("score-container");
const score = document.getElementById("score");

let randomWord = "";
//Choosing random word
function scrambleRandomWord() {
  const wordsArray = [
    "Random",
    "Scramble",
    "Lantern",
    "Journal",
    "Blanket",
    "Thunder",
    "Balloon",
    "Plastic",
    "Problem",
    "Machine",
    "Picture",
    "Captain",
    "Harvest",
    "Bracelet",
    "Monster",
    "Theater",
    "Measure",
    "Shelter",
    "Chimney",
    "Mystery",
    "Puzzled",
    "Imagine",
    "Cascade",
    "Evening",
    "Faction",
    "Orbiting",
    "Vehicle",
    "Revoked",
    "Refined",
    "Kitchen",
    "Necklace",
    "Stumble",
    "Charter",
    "Fashion",
    "Vulture",
    "Segment",
    "Paradox",
    "Request",
  ];

  // Function to get a random word
  function getRandomWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex].toUpperCase();
  }

  // Function to scramble the word
  function scrambleWord(word) {
    let wordArray = Array.from(word);
    for (let i = 0; i < wordArray.length; i++) {
      let randomIndex = Math.floor(Math.random() * wordArray.length);
      [wordArray[i], wordArray[randomIndex]] = [
        wordArray[randomIndex],
        wordArray[i],
      ];
    }
    return wordArray.join("");
  }

  // Main logic
  randomWord = getRandomWord(wordsArray);
  const scrambledWord = scrambleWord(randomWord);

  // Output scrambled word to the DOM
  scrambledWordContainer.innerHTML = `<p>${scrambledWord}</p>`;
}

//function to keep track of score
let pointCount = 0;

function updatePointCount() {
  pointCount += 1;
}

//function to check user guess
function checkGuess() {
  let guess = userGuess.value.toUpperCase();

  if (
    timerElement.innerHTML !== "Time left: 0" ||
    timerElement.innerHTML !== "Time's up!"
  ) {
    if (guess === randomWord) {
      statusContainer.innerHTML = `<p>That's right!</p>`;
      updatePointCount();
      // submitBtn.innerText = "next";
    } else {
      statusContainer.innerHTML = `<p>That's wrong!</p>`;
    }
  }
}

//Submit button click event

submitBtn.addEventListener("click", () => {
  if (submitBtn.innerText === "check") {
    submitBtn.innerText = "next";
    checkGuess();
  } else if (submitBtn.innerText === "next") {
    submitBtn.innerText = "check";

    userGuess.value = "";
    statusContainer.innerHTML = ``;
    scrambleRandomWord();
  }
});

//Enter click events to check guess function

userGuess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (submitBtn.innerText === "check") {
      submitBtn.innerText = "next";
      checkGuess();
    } else if (submitBtn.innerText === "next") {
      submitBtn.innerText = "check";
      userGuess.value = "";
      statusContainer.innerHTML = ``;
      scrambleRandomWord();
    }
  }
});

//function for timer
function startTimer(duration, timerElement) {
  let timeLeft = duration;
  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerElement.innerHTML = "Time's up!";
      inputContainer.style.display = "none";
      score.innerHTML = `Your score is ${pointCount}!`;
    } else {
      timerElement.innerHTML = `<p>Time left: <span>${timeLeft}</span></p>`;
      timeLeft--;
    }
  }, 1000);
}

//start game screen

function startGame() {
  document.getElementById("app").style.display = "flex";
  startGameScreen.style.display = "none";
  startTimer(60, timerElement);
  scrambleRandomWord();
}

startGameBtn.addEventListener("click", startGame);
