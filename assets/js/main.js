

const handleEmptySelection = (activeButtons, errorEl) => {
  if (!activeButtons.length) {
    errorEl.style.display = 'block';
    return false;
  }
  return true;
};

const handleMultipleChoice = (questionContainer, activeButtons, questionKey) => {
  const userAnswer = [...activeButtons].map(btn =>
    btn.textContent.trim()
  );

  const correctList = correctAnswers[questionKey];

  answers[questionKey] = userAnswer;

  multipleChoiceButtons.forEach((btn) => {
    const value = btn.textContent.trim();
    const isSelected = btn.classList.contains('active');
    const isCorrect = correctList.includes(value);

    if (isSelected && isCorrect) {
      btn.classList.add('correct');
    }

    if (isSelected && !isCorrect) {
      btn.classList.add('wrong');
    }

    if (!isSelected && isCorrect) {
      btn.classList.add('missed');
    }
  });
};

const handleSingleChoice = (activeButtons, questionKey) => {
  const selected = activeButtons[0];
  const value = selected.textContent.trim();

  answers[questionKey] = value;

  const isCorrect =
    correctAnswers[questionKey].trim().toLowerCase() ===
    value.toLowerCase();

  if (isCorrect) {
    selected.classList.add('correct');
  } else {
    selected.classList.add('wrong');
  }
};



const validateQuestion = async (questionContainer, questionKey) => {
  const activeButtons = questionContainer.querySelectorAll('.active');
  const errorEl = questionContainer.querySelector('.error');

  if (!handleEmptySelection(activeButtons, errorEl)) return false;

  errorEl.style.display = 'none';

  if (questionKey === '2') {
    handleMultipleChoice(questionContainer, activeButtons, questionKey);
  } else {
    handleSingleChoice(activeButtons, questionKey);
  }

  await handleTransition();

  lockButtons(questionKey);

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
  btn.addEventListener('click', async () => {
    if (!(currentPage > 1 && currentPage < 13) || isTransitioning) return;
    switch (currentPage) {
      case 2:
        const isValidQ1 = await validateQuestion(
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
        const isValidQ2 = await validateQuestion(
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
        // timerController.pause();
        break;


      case 6:
        showElement(gamePage);
        hideElement(firstInfoPage);
        // if (!Object.hasOwn(answers, 4)) {
        //   timerController.resume();
        // }
        hideElement(puzzleSection);
        thirdQuestionIndicator.style.display = 'inline-block';
        showElement(thirdQuestionContainer);
        break;

      case 7:
        const isValidQ3 = await validateQuestion(
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

        const isValidQ4 = await validateQuestion(
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
        // timerController.pause();
        displayCorrectQuestionCount();
        document
          .querySelectorAll('.q1-buttons, .q2-buttons, .q3-buttons, .q4-buttons')
          .forEach(el => {
            el.style.pointerEvents = 'none';
          });

        break;

      case 11:
        showElement(qrPage);
        hideElement(secondInfoPage);
        break;

      case 12:
        showElement(finalPage);
        hideElement(qrPage);
        break;


      default:
        return;
    }

    currentPage++;
  });
});

prevBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!(currentPage > 2 && currentPage <= 13) || isTransitioning) return;

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
        // if (!Object.hasOwn(answers, 4)) {
        //   timerController.resume();          
        // }

        showElement(puzzleSection);
        break;

      // Returning from page 7 -> page 6
      case 7:
        hideElement(thirdQuestionContainer);
        thirdQuestionIndicator.style.display = 'none';
        showElement(gamePage);
        showElement(firstInfoPage);
        // timerController.pause();
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
        hideElement(qrPage);
        showElement(secondInfoPage);
        break;

      // Returning from page 13 -> page 12
      case 13:
        hideElement(finalPage);
        showElement(qrPage);
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
    startGame();
  }, 400);

});



document.addEventListener("DOMContentLoaded", async () => {
  try {
    await preloadAssets();

    setTimeout(function () {
      bodyElement.classList.add("loaded");
    }, 1000);
  } catch (e) {
    console.error("Preload failed", e);
    loader.classList.add("loaded"); // fail-safe
  }
});












