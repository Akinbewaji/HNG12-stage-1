const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor;
let score = 0;
let gameActive = true;

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

function startNewGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = ''; // Clear the color box
    gameStatus.textContent = '';
    scoreDisplay.textContent = `Score: ${score}`;
    colorOptionsContainer.innerHTML = '';
    colors.forEach(color => {
        const button = document.createElement('div');
        button.classList.add('color-option');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => checkGuess(color));
        colorOptionsContainer.appendChild(button);
    });
    gameActive = true; // Set game active
}

function checkGuess(selectedColor) {
    if (!gameActive) return; // Prevent further guesses if the game is over

    colorBox.style.backgroundColor = targetColor; // Show the target color

    if (selectedColor === targetColor) {
        score++;
        showPopup('Correct! Would you like to advance to the next round or quit?', true);
    } else {
        showPopup('Wrong! Game Over.', false);
        gameActive = false; // End the game
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

function showPopup(message, isCorrect) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    const advanceButton = document.createElement('button');
    advanceButton.textContent = 'Advance';
    advanceButton.style.display = isCorrect ? 'inline' : 'none';
    advanceButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        startNewGame();
    });

    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New Game';
    newGameButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        startNewGame();
    });

    popup.appendChild(advanceButton);
    popup.appendChild(newGameButton);
    document.body.appendChild(popup);
}

newGameButton.addEventListener('click', () => {
    score = 0;
    startNewGame();
});

startNewGame();
