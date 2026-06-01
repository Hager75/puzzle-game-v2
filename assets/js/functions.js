
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
    const total = ASSETS.length;

    if (total === 0) resolve();

    ASSETS.forEach((src) => {
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
    // bodyElement.classList.remove("loaded");
   timerController = startCountDown(mins, timer);

}


const showElement = (element, display = 'flex') => {
  element.style.display = display;
  element.classList.add('fade-in');
};

const hideElement = (element) => {
  element.style.display = 'none';
};

