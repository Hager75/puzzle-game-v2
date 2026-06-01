

const validateQuestion = (questionContainer, questionKey) => {
  const activeButtons = questionContainer.querySelectorAll('.active');

  if (!activeButtons.length) {
    questionContainer.querySelector('.error').style.display = 'block';
    return false;
  }

  questionContainer.querySelector('.error').style.display = 'none';

  answers[questionKey] = [...activeButtons].map(btn =>
    btn.textContent.trim()
  );

  return true;
};


firstQuestionAnswersBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    firstQuestionAnswersBtns.forEach((button) => {
      button.classList.remove('active');
    });

    btn.classList.add('active');
    firstQuestionContainer.querySelector('.error').style.display = 'none';
  })
})

multipleChoiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    secondQuestionContainer.querySelector('.error').style.display = 'none';
  });
});

thirdQuestionAnswersBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    thirdQuestionAnswersBtns.forEach((button) => {
      button.classList.remove('active');
    });

    btn.classList.add('active');
    thirdQuestionContainer.querySelector('.error').style.display = 'none';
  })
})

fourthQuestionAnswersBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    fourthQuestionAnswersBtns.forEach((button) => {
      button.classList.remove('active');
    });

    btn.classList.add('active');
    fourthQuestionContainer.querySelector('.error').style.display = 'none';
  })
})



nextBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!(currentPage > 1 && currentPage < 12)) return;
    switch (currentPage) {
      case 2:
        const isValidQ1 = validateQuestion(
          firstQuestionContainer,
          '1'
        );
        if (!isValidQ1) return;
        showElement(puzzleSection);
        hideElement(firstQuestionContainer);
        gamePage.querySelector('.prev.disabled')?.classList?.remove('disabled');
        break;

      case 3:
        hideElement(puzzleSection);
        secondQuestionIndicator.style.display = 'inline-block';
        showElement(secondQuestionContainer);
        break;

      case 4:
        const isValidQ2 = validateQuestion(
          secondQuestionContainer,
          '2'
        );
        if (!isValidQ2) return;
        showElement(puzzleSection);
        hideElement(secondQuestionContainer);
        showElement(secondPuzzleProgress);
        hideElement(firstPuzzleProgress);
        break;

      case 5:
        showElement(firstInfoPage);
        hideElement(gamePage);
        timerController.pause();
        document
          .querySelectorAll('.q1-buttons, .q2-buttons')
          .forEach(el => {
            el.style.pointerEvents = 'none';
          });
        break;


      case 6:
        showElement(gamePage);
        hideElement(firstInfoPage);
        if (!Object.hasOwn(answers, 4)) {
          timerController.resume();
        }
        hideElement(puzzleSection);
        thirdQuestionIndicator.style.display = 'inline-block';
        showElement(thirdQuestionContainer);
        break;

      case 7:
        const isValidQ3 = validateQuestion(
          thirdQuestionContainer,
          '3'
        );
        if (!isValidQ3) return;
        showElement(puzzleSection);
        hideElement(thirdQuestionContainer);
        showElement(thirdPuzzleProgress);
        hideElement(secondPuzzleProgress);

        break;

      case 8:
        hideElement(puzzleSection);
        fourthQuestionIndicator.style.display = 'inline-block';
        showElement(fourthQuestionContainer);
        break;

      case 9:

        const isValidQ4 = validateQuestion(
          fourthQuestionContainer,
          '4'
        );
        if (!isValidQ4) return;
        showElement(puzzleSection);
        hideElement(fourthQuestionContainer);
        showElement(fourthPuzzleProgress);
        hideElement(thirdPuzzleProgress);
        break;

      case 10:
        showElement(secondInfoPage);
        hideElement(gamePage);
        timerController.pause();
        document
          .querySelectorAll('.q3-buttons, .q4-buttons')
          .forEach(el => {
            el.style.pointerEvents = 'none';
          });

        break;

      case 11:
        showElement(finalPage);
        hideElement(secondInfoPage);
        break;

      default:
        return;
    }

    currentPage++;
  });
});

prevBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!(currentPage > 2 && currentPage <= 12)) return;

    switch (currentPage) {
      // Returning from page 3 -> page 2
      case 3:
        hideElement(puzzleSection);
        showElement(firstQuestionContainer);
        gamePage.querySelector('.prev')?.classList?.add('disabled');
        break;

      // Returning from page 4 -> page 3
      case 4:
        hideElement(secondQuestionContainer);
        secondQuestionIndicator.style.display = 'none';
        showElement(puzzleSection);
        break;

      // Returning from page 5 -> page 4
      case 5:
        hideElement(puzzleSection);
        hideElement(secondPuzzleProgress);
        showElement(firstPuzzleProgress);
        showElement(secondQuestionContainer);
        break;

      // Returning from page 6 -> page 5
      case 6:
        hideElement(firstInfoPage);
        showElement(gamePage);
        if (!Object.hasOwn(answers, 4)) {
          timerController.resume();          
        }

        showElement(puzzleSection);
        break;

      // Returning from page 7 -> page 6
      case 7:
        hideElement(thirdQuestionContainer);
        thirdQuestionIndicator.style.display = 'none';
        showElement(gamePage);
        showElement(firstInfoPage);
        timerController.pause();
        break;

      // Returning from page 8 -> page 7
      case 8:
        hideElement(puzzleSection);
        hideElement(thirdPuzzleProgress);
        showElement(secondPuzzleProgress);
        showElement(thirdQuestionContainer);
        break;

      // Returning from page 9 -> page 8
      case 9:
        hideElement(fourthQuestionContainer);
        fourthQuestionIndicator.style.display = 'none';
        showElement(puzzleSection);
        break;

      // Returning from page 10 -> page 9
      case 10:
        hideElement(puzzleSection);
        hideElement(fourthPuzzleProgress);
        showElement(thirdPuzzleProgress);
        showElement(fourthQuestionContainer);
        break;

      // Returning from page 11 -> page 10
      case 11:
        hideElement(secondInfoPage);
        showElement(gamePage);
        showElement(puzzleSection);
        showElement(fourthPuzzleProgress);
        break;

      // Returning from page 12 -> page 11
      case 12:
        hideElement(finalPage);
        showElement(secondInfoPage);
        break;

      default:
        return;
    }

    currentPage--;
  });
});


homeBtn.addEventListener("click", function (e) {
  location.reload();
});

restartBtn.addEventListener("click", function (e) {
  location.reload();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  loginPage.classList.add("fade-out");

  setTimeout(() => {
    loginPage.style.display = "none";
    gamePage.style.display = "flex";
    gamePage.classList.add("fade-in");
    currentPage++;
    startGame();
  }, 400);

});



document.addEventListener("DOMContentLoaded", async () => {
  try {
    // await preloadAssets();

    // setTimeout(function () {
    //   bodyElement.classList.add("loaded");
    // }, 1000);
  } catch (e) {
    console.error("Preload failed", e);
    // loader.classList.add("loaded"); // fail-safe
  }
});












