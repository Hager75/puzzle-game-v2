const bodyElement = document.getElementById("main-body");
const form = document.getElementById("startForm");
const loginPage = document.getElementById("login-page");
const gamePage = document.getElementById("game-page");

const timer = document.getElementById("realtime");
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
const mins = 2;
const resultText = {
  win: "You Win! 🎉",
  lose: "You Lose! ❌"
}
const answers = {};
let currentPage = 1;
let timerController = null;


// const ASSETS = [
//   // GAME
//   "assets/images/main-with.png",

//   // LOGIN
//   "assets/images/game final-05.png",
//   "assets/images/checked.svg",
//   "assets/images/start-btn.svg",

//   // FOOTER
//   "assets/images/logo-3.svg",
//   "assets/images/logo-1.svg",
//   "assets/images/new-logo.png",
//   "assets/images/missing-logo.svg",
//   "assets/images/msd-logo.svg",

//   // INFO PAGE
//   "assets/images/Asset 15.png",
//   "assets/images/Asset 18.svg",
//   "assets/images/Asset 11.png",
//   "assets/images/img-3-07.png",
//   "assets/images/img-2-06.png",
//   "assets/images/img-1-05.png",
//   "assets/images/Asset 14.svg",
//   "assets/images/Asset 17.svg",
//   "assets/images/Asset 16.svg",

//   // QR
//   "assets/images/Asset 2-last-2-01.svg",
//   "assets/images/Asset 3-last-2-01.svg",
//   "assets/images/Asset 1-last-2-01.svg",
//   "assets/images/Asset 5-last--2-01.svg",

//   // NAV
//   "assets/images/next-btn.svg",
//   "assets/images/prev-btn.svg",
//   "assets/images/home-btn.svg",
//   "assets/images/restart-btn.svg",
//   "assets/images/preview.svg"
// ];



