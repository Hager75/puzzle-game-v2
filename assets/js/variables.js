const bodyElement = document.getElementById("main-body");
const form = document.getElementById("startForm");
const loginPage = document.getElementById("login-page");
const gamePage = document.getElementById("game-page");
const qrPage = document.getElementById("qr-page");

// const timer = document.getElementById("realtime");
const firstQuestionAnswersBtns = document.querySelectorAll('.q1-buttons');
const multipleChoiceButtons = document.querySelectorAll('.q2-buttons');
const thirdQuestionAnswersBtns = document.querySelectorAll('.q3-buttons');
const fourthQuestionAnswersBtns = document.querySelectorAll('.q4-buttons');
// const errorMessages = document.querySelectorAll('.error');


const puzzleSection = document.querySelector(".puzzle-container");
// circle
const secondQuestionIndicator = document.querySelector(".q2-completed");
const thirdQuestionIndicator = document.querySelector(".q3-completed");
const fourthQuestionIndicator = document.querySelector(".q4-completed");

// puzzle images for progress
const firstPuzzleProgress = document.querySelector(".progress-1");
const secondPuzzleProgress = document.querySelector(".progress-2");
const thirdPuzzleProgress = document.querySelector(".progress-3");
const fourthPuzzleProgress = document.querySelector(".progress-4");

// question text and answers
const firstQuestionContainer = document.querySelector(".q1-container");
const secondQuestionContainer = document.querySelector(".q2-container");
const thirdQuestionContainer = document.querySelector(".q3-container");
const fourthQuestionContainer = document.querySelector(".q4-container");


const firstInfoPage = document.querySelector(".info1-page");
const secondInfoPage = document.querySelector(".info2-page");
const finalPage = document.querySelector(".final-page");

// const qrPage = document.querySelector(".qr-container");
const nextBtn = document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".prev");
const homeBtn = document.querySelector(".final-page .home");
const restartBtn = document.querySelector(".restart-btn");
const resultElement = document.querySelector(".result");
const mins = 2;
const resultText = {
  win: "You Win! 🎉",
  lose: "You Lose! ❌"
}
const answers = {};
const correctAnswers = {
  1: 'true',
  2:  ['Cervical' , 'Vulvar', 'Vaginal', 'Anal', 'Oropharyngeal'],
  3: '82%',
  4: 'single dose'
}
let currentPage = 1;
let isTransitioning = false;
let timerController = null; // not used, use it if there is a timer

const imageUrls = [
  "assets/images/game final-05.png",
  "assets/images/start-btn-v2.svg",
  "assets/images/logo-3.svg",
  "assets/images/new-logo.png",
  "assets/images/msd-logo.svg",
  "assets/images/side-bar-header.svg",
  "assets/images/Asset 6.svg",
  "assets/images/question-count.svg",
  "assets/images/circle.svg",
  "assets/images/preview.svg",
  "assets/images/progress-1.png",
  "assets/images/progress-2.png",
  "assets/images/progress-3.png",
  "assets/images/progress-final.png",
  "assets/images/Asset 15.svg",
  "assets/images/Asset 50.svg",
  "assets/images/Asset 40.svg",
  "assets/images/Asset 39.svg",
  "assets/images/Asset 47.svg",
  "assets/images/choose-apply.svg",
  "assets/images/a-letter.svg",
  "assets/images/b-letter.svg",
  "assets/images/c-letter.svg",
  "assets/images/d-letter.svg",
  "assets/images/Asset 26.svg",
  "assets/images/Asset 25.svg",
  "assets/images/Asset 32.svg",
  "assets/images/Asset 31.svg",
  "assets/images/Asset 23.svg",
  "assets/images/Asset 22.svg",
  "assets/images/img-1.png",
  "assets/images/info-2.png",
  "assets/images/Asset 37.png",
  "assets/images/left-qr.svg",
  "assets/images/logo-qr.svg",
  "assets/images/right-qr.svg",
  "assets/images/restart-btn.svg",
  "assets/images/prev-btn.svg",
  "assets/images/next-btn.svg",
  "assets/images/home-btn.svg",
  "assets/images/favicon.ico"
];



