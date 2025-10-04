let code = '';
let codeLength = 4;

const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const hint = document.getElementById('hint');
const attemptsContainer = document.getElementById('attemptsContainer');
const levelSelect = document.getElementById('levelSelect');

let attempts = 0;
const maxAttempts = 10;

// Generate code
function generateCode(length) {
  let result = '';
  for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
  return result;
}

// Initialize
function initGame() {
  codeLength = parseInt(levelSelect.value);
  guessInput.maxLength = codeLength;
  code = generateCode(codeLength);
  attempts = 0;
  attemptsContainer.innerHTML = '';
  hint.textContent = '';
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = '';
}

levelSelect.addEventListener('change', initGame);
initGame();

submitBtn.addEventListener('click', () => {
  let guess = guessInput.value.trim();
  if (guess.length !== codeLength || isNaN(guess)) {
    hint.textContent = "Enter a valid code!";
    return;
  }

  attempts++;
  displayAttempt(guess);

  if (guess === code) {
    hint.textContent = `🎉 You cracked the code in ${attempts} attempts!`;
    guessInput.disabled = true;
    submitBtn.disabled = true;
  } else if (attempts >= maxAttempts) {
    hint.textContent = `💀 Game Over! The code was ${code}.`;
    guessInput.disabled = true;
    submitBtn.disabled = true;
  } else {
    hint.textContent = `Attempts left: ${maxAttempts - attempts}`;
  }

  guessInput.value = '';
});

function displayAttempt(guess) {
  const attemptDiv = document.createElement('div');
  attemptDiv.classList.add('attempt');

  for (let i = 0; i < guess.length; i++) {
    const span = document.createElement('div');
    span.classList.add('digit');

    if (guess[i] === code[i]) span.classList.add('correct');
    else if (code.includes(guess[i])) span.classList.add('correct-position');
    else span.classList.add('wrong');

    span.textContent = guess[i];
    attemptDiv.appendChild(span);
  }

  attemptsContainer.appendChild(attemptDiv);
}
