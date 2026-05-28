
// start countdown
function startCountDown(mins, timerContainer) {
    let seconds = mins * 60;

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const interval = setInterval(() => {
        if (seconds <= 0) {
            timerContainer.textContent = "00:00";
            clearInterval(interval);
            if (countPieces !== totalPieces) {
                displayInfoPage(false); // lose
            }
            // end game
        } else {
            timerContainer.textContent = formatTime(seconds);
            seconds--;
        }
    }, 1000);
}


function displayInfoPage(isWinner) {
    gamePage.style.display = "none";
    infoPage.style.display = "flex";
    currentPage++;
    resultMessageElement.innerHTML = isWinner ? resultText.win : resultText.lose;
    infoPage.classList.add("fade-in");
}

function startGame() {
    // bodyElement.classList.remove("loaded");
    startCountDown(mins, timer);

}

