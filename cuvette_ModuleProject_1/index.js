window.addEventListener("DOMContentLoaded", () => {
    const userScoreDiv = document.getElementById("your_score");
    const computerScoreDiv = document.getElementById("computer_score");

    const userScore = getItem("userScore");
    const computerScore = getItem("computerScore");

    if (userScore) {
        userScoreDiv.innerText = userScore;
    }

    if (computerScore) {
        computerScoreDiv.innerText = computerScore;
    }
});

function getItem(name) {
    return localStorage.getItem(name);
}

// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [{
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText1 = document.querySelector(".results__text1");
const resultText2 = document.querySelector(".results__text2");

const playAgainBtn = document.querySelector("#play-again");

const scoreNumber = document.querySelector(".score__number");
const nextBtn = document.querySelector(".next-btn");

let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="./assets/${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
        }, idx * 100);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText1.innerText = "YOU WIN";
            resultText2.innerHTML = "AGAINST PC";
            resultDivs[0].classList.toggle("winner");
            keepScore(1);
            nextBtn.style.display = "block";
            playAgainBtn.style.display = "none";

            nextBtn.addEventListener("click", () => {
                window.location.href = "hurray.html";
            });
        } else if (aiWins) {
            resultText1.innerText = "YOU LOST";
            resultText2.innerHTML = "AGAINST PC";
            resultDivs[1].classList.toggle("winner");
            keepScore(-1);
            nextBtn.style.display = "none";
        } else {
            resultText1.innerText = "TIE UP";
            nextBtn.style.display = "none";
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    if (point > 0) {
        const userScoreDiv = document.getElementById("your_score");
        let userScore = parseInt(userScoreDiv.innerText);
        userScore += point;
        userScoreDiv.innerText = userScore;
        // Set localstorage
        localStorage.setItem("userScore", userScore);
        console.log("saved user score");
    } else if (point < 0) {
        const computerScoreDiv = document.getElementById("computer_score");
        let computerScore = parseInt(computerScoreDiv.innerText);
        computerScore += Math.abs(point);
        computerScoreDiv.innerText = computerScore;
        // set in localstorage
        localStorage.setItem("computerScore", computerScore);
        console.log("saved computer score");
    }
}

const playAgain = () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText1.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
};

// Play Again
playAgainBtn.addEventListener("click", playAgain);

// Show/Hide Rules
btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});

// playAgainBtn.addEventListener("click", () => {
//   window.location.href = "index.html";
// });