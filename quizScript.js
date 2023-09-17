const optionsContainerElement = document.getElementById("options-container");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const endButton = document.getElementById("end-btn");

const questionElement = document.querySelector(".question");
const optionElements = document.querySelectorAll(".option");

const startMessage = document.getElementById("startMessage");
const endMessageContainer = document.querySelector(".endMessage-container");
const endMessage = document.getElementById("endMessage");

let points = 0;
let questionIndex = 0;
let pressed = false;

const questions = [
  {
    question:
      "According to The Animals, where is the 'House of the Rising Sun'?",
    answers: [
      { value: "New Orleans", correct: true },
      { value: "Atlanta", correct: false },
      { value: "San Antonio", correct: false },
      { value: "Little Rock", correct: false },
    ],
  },
  {
    question: "What was the only Number 1 hit for 'The Troggs'?",
    answers: [
      { value: "With a Girl Like You", correct: true },
      { value: "Maggie May", correct: false },
      { value: "Running", correct: false },
      { value: "Wild Thing", correct: false },
    ],
  },
  {
    question:
      "Creedance Clearwater Survival had a hit with which of the following songs?",
    answers: [
      { value: "Fortunate Son", correct: true },
      { value: "Fortunate Daughter", correct: false },
      { value: "Unfortunate Son", correct: false },
      { value: "Fortunate Nephew", correct: false },
    ],
  },
  {
    question: "Where does Bruce Springsteen sing about being born?",
    answers: [
      { value: "USA", correct: true },
      { value: "USSR", correct: false },
      { value: "Down Under", correct: false },
      { value: "Katmandu", correct: false },
    ],
  },
  {
    question:
      "Rock You Like A Hurricane and Wind of Change are songs by which classic rock band?",
    answers: [
      { value: "Scorpions", correct: true },
      { value: "Lobsters", correct: false },
      { value: "Sharks", correct: false },
      { value: "Crustaceans", correct: false },
    ],
  },
  {
    question: "Who was a former lead guitarist for Guns  N' Roses?",
    answers: [
      { value: "Slash", correct: true },
      { value: "C.C. DeVille", correct: false },
      { value: "Flea", correct: false },
      { value: "The Edge", correct: false },
    ],
  },
  {
    question: "What group recorded the song 'Dream On'?",
    answers: [
      { value: "Aerosmith", correct: true },
      { value: "The Who", correct: false },
      { value: "Pink Floyd", correct: false },
      { value: "The Rolling Stones", correct: false },
    ],
  },
  {
    question: "What group is known for the hit song 'Purple Haze'?",
    answers: [
      { value: "Jimi Hendrix", correct: true },
      { value: "The Eagles", correct: false },
      { value: "Journey", correct: false },
      { value: "Derek & The Dominoes", correct: false },
    ],
  },
  {
    question: "What group recorded 'Gimme Shelter'?",
    answers: [
      { value: "The Rolling Stones", correct: true },
      { value: "The Who", correct: false },
      { value: "Led Zeppelin", correct: false },
      { value: "The Knack", correct: false },
    ],
  },
  {
    question: "The Boys are Back in Town is a hit by which classic rock band?",
    answers: [
      { value: "Thin Lizzy", correct: true },
      { value: "Large Lizzy", correct: false },
      { value: "Ozzy Osbourne", correct: false },
      { value: "Little Lizzy", correct: false },
    ],
  },
];

function resortQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

function startGame() {
  startMessage.classList.add("hide");
  startButton.classList.add("hide");

  questionElement.classList.remove("hide");
  nextButton.classList.remove("hide");

  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].classList.remove("hide");
  }

  questionIndex = 0;
  endMessageContainer.classList.add("hide");
  pressed = false;
}

function showQuestion() {
  questions[questionIndex].answers.sort(() => Math.random() - 0.5);
  questionElement.textContent = questions[questionIndex].question;
  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].textContent = questions[questionIndex].answers[i].value;
  }

  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].style.backgroundColor = "";
  }

  if (questionIndex + 1 === questions.length) {
    nextButton.classList.add("hide");
    endButton.classList.remove("hide");
  }
}

optionsContainerElement.onclick = (event) => {
  if (!event.target.classList.contains("option")) return;
  if (pressed) return;

  pressed = true;
  let arr = questions[questionIndex].answers;
  let ans = arr.find((item) => item.value == event.target.textContent);

  if (ans.correct) {
    points++;
    event.target.style.backgroundColor = "#55A630";
  } else {
    event.target.style.backgroundColor = "#dc2f02";
    let corAns = arr.find((item) => item.correct === true);
    for (let i = 0; i < optionElements.length; i++) {
      if (optionElements[i].textContent == corAns.value) {
        optionElements[i].style.backgroundColor = "green";
      }
    }
  }
};

nextButton.onclick = (event) => {
  questionIndex++;
  showQuestion();
  pressed = false;
};

startButton.onclick = () => {
  resortQuestions();
  startGame();
  showQuestion();
};

endButton.onclick = () => {
  questionElement.classList.add("hide");
  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].classList.add("hide");
  }
  endButton.classList.add("hide");
  endMessageContainer.classList.remove("hide");
  endMessage.textContent = `You have scored ${points} / ${questions.length} points!`;
  startButton.classList.remove("hide");
};
