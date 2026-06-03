
// start countdown
function startCountDown(mins, timerContainer) {
    let seconds = mins * 60;
    let interval = null;
    let isRunning = false;

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function tick() {
        if (seconds <= 0) {
            timerContainer.textContent = '00:00';
            clearInterval(interval);
            interval = null;
            isRunning = false;

            if (answers) {
                displayInfoPage(false);
            }

            return;
        }

        timerContainer.textContent = formatTime(seconds);
        seconds--;
    }

    function start() {
        if (isRunning) return;

        isRunning = true;
        interval = setInterval(tick, 1000);
    }

    timerContainer.textContent = formatTime(seconds);
    start();

    return {
        pause() {
            if (!isRunning) return;

            clearInterval(interval);
            interval = null;
            isRunning = false;
        },

        resume() {
            if (isRunning || seconds <= 0) return;

            start();
        },

        stop() {
            clearInterval(interval);
            interval = null;
            isRunning = false;
            seconds = 0;
            timerContainer.textContent = '00:00';
        },

        getRemainingSeconds() {
            return seconds;
        }
    };
}

function preloadAssets() {
    return new Promise((resolve) => {
        let loaded = 0;
        const total = imageUrls.length;

        if (total === 0) resolve();

        imageUrls.forEach((src) => {
            const img = new Image();
            img.src = src;

            img.onload = img.onerror = () => {
                loaded++;

                if (loaded === total) {
                    resolve();
                }
            };
        });
    });
}

function displayInfoPage(isWinner) {
    gamePage.style.display = "none";
    secondInfoPage.style.display = "flex";
    currentPage = 11;
    // go to scan qr code and show number of correct answers
    // resultMessageElement.innerHTML = isWinner ? resultText.win : resultText.lose;
    secondInfoPage.classList.add("fade-in");
}

function startGame() {
    loginPage.style.display = "none";
    gamePage.style.display = "flex";
    gamePage.classList.add("fade-in");
    currentPage++;
    //    timerController = startCountDown(mins, timer);
}


const showElement = (element, display = 'flex') => {
    element.style.display = display;
    isTransitioning = true;
    element.classList.add('fade-in');
    element.addEventListener('animationend', () => {
        isTransitioning = false;
    }, { once: true });
};

const hideElement = (element) => {
    element.style.display = 'none';
};

function getCorrectAnswersCount(answers, correctAnswers) {
    let count = 0;
    Object.keys(correctAnswers).forEach(key => {
        const correct = correctAnswers[key];
        const userAnswer = answers[key];

        let isCorrect = false;

        if (Array.isArray(correct)) {
            isCorrect =
                Array.isArray(userAnswer) &&
                correct.length === userAnswer.length &&
                correct.every(answer => userAnswer.includes(answer));
        } else {
            isCorrect =
                String(userAnswer).trim().toLowerCase() ===
                String(correct).trim().toLowerCase();
        }

        if (isCorrect) {
            count++;
        }
    });

    return count;
}

const displayCorrectQuestionCount = () => {
    const correctCount = getCorrectAnswersCount(answers, correctAnswers);
    resultElement.textContent = `You answered ${correctCount} of ${Object.keys(correctAnswers).length} questions correctly`;
}


const handleTransition = async () => {
    isTransitioning = true;
    await new Promise(resolve => setTimeout(resolve, 700));
    isTransitioning = false;
};

const lockButtons = (questionKey) => {
    document
        .querySelectorAll(`.q${questionKey}-buttons`)
        .forEach(el => {
            el.style.pointerEvents = 'none';
        });
};
