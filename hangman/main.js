import info from "./info.json" assert { type: "json" };

function callRecursiveGame() {
  let infoObject = info[Math.floor(Math.random() * info.length)];
  while (infoObject["hint"] === localStorage.getItem("hint")) {
    infoObject = info[Math.floor(Math.random() * info.length)];
  }
  const infoWord = infoObject["word"];
  console.log(infoWord);
  const infoHint = infoObject["hint"];
  localStorage.setItem("hint", infoHint);
  const infoNumber = infoObject["number-of-letters"];

  const body = document.createElement("body");

  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.classList.add("title-of-game");
  h1.textContent = "Hangman Game";
  header.appendChild(h1);

  const main = document.createElement("main");

  const interactiveHangmanSection = document.createElement("section");
  interactiveHangmanSection.classList.add("interactive-hangman");

  const hangmanToolDiv = document.createElement("div");
  hangmanToolDiv.classList.add("interactive-hangman__tool");

  const hangmanToolImages = [
    "hangman.png",
    "head.png",
    "body.png",
    "left-hand.png",
    "right-hand.png",
    "leg.png",
    "leg.png",
  ];

  const hangmanToolClasses = [
    "hangman-tool",
    "head",
    "body",
    "left-hand",
    "right-hand",
    "left-leg",
    "right-leg",
  ];

  const img = document.createElement("img");
  img.classList.add("hangman-tool", hangmanToolClasses[0]);
  img.src = "./assets/" + hangmanToolImages[0];
  img.alt = hangmanToolClasses[0];
  hangmanToolDiv.appendChild(img);

  interactiveHangmanSection.appendChild(hangmanToolDiv);

  const wordGuessingDashboardSection = document.createElement("section");
  wordGuessingDashboardSection.classList.add("word-guessing-dashboard");

  const wordDiv = document.createElement("div");
  wordDiv.classList.add("word-guessing-dashboard__word");

  for (let i = 0; i < infoNumber; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("word-guessing-dashboard__word__letter");
    wordDiv.appendChild(letterDiv);
  }

  const hintDiv = document.createElement("div");
  hintDiv.classList.add("word-guessing-dashboard__hint");
  const hintWordP = document.createElement("p");
  hintWordP.classList.add("word-guessing-dashboard__hint__word");
  hintWordP.textContent = "Hint:";
  const hintContentP = document.createElement("p");
  hintContentP.classList.add("word-guessing-dashboard__hint__content");
  hintContentP.textContent = infoHint;
  hintDiv.appendChild(hintWordP);
  hintDiv.appendChild(hintContentP);

  const countOfGuessesDiv = document.createElement("div");
  countOfGuessesDiv.classList.add("word-guessing-dashboard__count-of-guesses");
  const sentenceP = document.createElement("p");
  sentenceP.classList.add(
    "word-guessing-dashboard__count-of-guesses__sentence",
  );
  sentenceP.textContent = "Incorrect guesses:";
  const textOfNumberDiv = document.createElement("div");
  textOfNumberDiv.classList.add(
    "word-guessing-dashboard__count-of-guesses__text-of-number",
  );
  const numberP = document.createElement("p");
  numberP.classList.add("word-guessing-dashboard__count-of-guesses__number");
  numberP.textContent = "0";
  const totalP = document.createElement("p");
  totalP.classList.add("word-guessing-dashboard__count-of-guesses__total");
  totalP.textContent = "/6";
  textOfNumberDiv.appendChild(numberP);
  textOfNumberDiv.appendChild(totalP);
  countOfGuessesDiv.appendChild(sentenceP);
  countOfGuessesDiv.appendChild(textOfNumberDiv);

  const keyboardDiv = document.createElement("div");
  keyboardDiv.classList.add("word-guessing-dashboard__keyboard");

  const buttons = [];

  for (let i = 0; i < 26; i++) {
    const button = document.createElement("button");
    button.classList.add("word-guessing-dashboard__keyboard__button");
    const clickedLetter = String.fromCharCode(65 + i);
    button.textContent = clickedLetter;
    button.addEventListener("click", (event) =>
      addEventListenerOnTheButton(clickedLetter, button),
    );
    keyboardDiv.appendChild(button);
    buttons.push(button);
  }

  document.addEventListener("keydown", addEventListenerOnTheButtonOfKeyword);

  wordGuessingDashboardSection.appendChild(wordDiv);
  wordGuessingDashboardSection.appendChild(hintDiv);
  wordGuessingDashboardSection.appendChild(countOfGuessesDiv);
  wordGuessingDashboardSection.appendChild(keyboardDiv);

  main.appendChild(interactiveHangmanSection);
  main.appendChild(wordGuessingDashboardSection);

  body.appendChild(header);
  body.appendChild(main);

  document.documentElement.replaceChild(body, document.body);

  function createHappyModalWindow() {

    const buttons = document.getElementsByClassName("word-guessing-dashboard__keyboard__button");
    const buttonsArray = Array.from(buttons);

    function removeEventListenerFromButtons(event) {
      buttonsArray.forEach((button) => {
        button.removeEventListener(event, addEventListenerOnTheButton);
      });
    }

    removeEventListenerFromButtons("click");
    document.removeEventListener(
      "keydown",
      addEventListenerOnTheButtonOfKeyword,
    );

    const previousModal = document.querySelector(".modal-window-container");
    if (previousModal) {
      previousModal.remove();
    }

    const modalWindowContainer = document.createElement("section");
    modalWindowContainer.className = "modal-window-container";
    modalWindowContainer.style.display = "flex";

    const modalWindow = document.createElement("section");
    modalWindow.className = "modal-window";

    const modalWindowMain = document.createElement("div");
    modalWindowMain.className = "modal-window__main";

    const happyHead = document.createElement("img");
    happyHead.className = "happy-head";
    happyHead.src = "./assets/happy-head.png";
    happyHead.alt = "happy-head";

    const modalWindowTitle = document.createElement("h2");
    modalWindowTitle.className = "modal-window__main__title";
    modalWindowTitle.textContent = "Bravo! You emerged victorious!";

    modalWindowMain.appendChild(happyHead);
    modalWindowMain.appendChild(modalWindowTitle);

    const rightWord = document.createElement("p");
    rightWord.className = "modal-window__right-word";
    rightWord.textContent = `Right word is ${infoWord}`;

    const modalWindowQuestion = document.createElement("p");
    modalWindowQuestion.className = "modal-window__question";
    modalWindowQuestion.textContent = "Would you like to play once more?";

    const modalWindowButton = document.createElement("button");
    modalWindowButton.className = "modal-window__main__button";
    modalWindowButton.textContent = "Yes, I want!";

    modalWindowButton.addEventListener("click", () => {
      modalWindowContainer.style.display = "none";
      document.removeEventListener(
        "keydown",
        addEventListenerOnTheButtonOfKeyword,
      );
      callRecursiveGame();
    });

    modalWindow.appendChild(modalWindowMain);
    modalWindow.appendChild(rightWord);
    modalWindow.appendChild(modalWindowQuestion);
    modalWindow.appendChild(modalWindowButton);

    modalWindowContainer.appendChild(modalWindow);

    document.body.appendChild(modalWindowContainer);
  }

  function createSadModalWindow() {

    const buttons = document.getElementsByClassName("word-guessing-dashboard__keyboard__button");
    const buttonsArray = Array.from(buttons);

    function removeEventListenerFromButtons(event) {
      buttonsArray.forEach((button) => {
        button.removeEventListener(event, addEventListenerOnTheButton);
      });
    }

    removeEventListenerFromButtons("click");
    document.removeEventListener(
      "keydown",
      addEventListenerOnTheButtonOfKeyword,
    );

    const previousModal = document.querySelector(".modal-window-container");
    if (previousModal) {
      previousModal.remove();
    }

    const modalWindowContainer = document.createElement("section");
    modalWindowContainer.className = "modal-window-container";
    modalWindowContainer.style.display = "flex";

    const modalWindow = document.createElement("section");
    modalWindow.className = "modal-window";

    const modalWindowMain = document.createElement("div");
    modalWindowMain.className = "modal-window__main";

    const happyHead = document.createElement("img");
    happyHead.className = "happy-head";
    happyHead.src = "./assets/sad-head.png";
    happyHead.alt = "sad-head";

    const modalWindowTitle = document.createElement("h2");
    modalWindowTitle.className = "modal-window__main__title";
    modalWindowTitle.textContent =
      "I'm upset! You failed, and the elf passed away";

    modalWindowMain.appendChild(happyHead);
    modalWindowMain.appendChild(modalWindowTitle);

    const rightWord = document.createElement("p");
    rightWord.className = "modal-window__right-word";
    rightWord.textContent = `Right word is ${infoWord}`;

    const modalWindowQuestion = document.createElement("p");
    modalWindowQuestion.className = "modal-window__question";
    modalWindowQuestion.textContent = "Would you like to play once more?";

    const modalWindowButton = document.createElement("button");
    modalWindowButton.className = "modal-window__main__button";
    modalWindowButton.textContent = "Yes, I want!";

    modalWindowButton.addEventListener("click", () => {
      modalWindowContainer.style.display = "none";
      callRecursiveGame();
    });

    modalWindow.appendChild(modalWindowMain);
    modalWindow.appendChild(rightWord);
    modalWindow.appendChild(modalWindowQuestion);
    modalWindow.appendChild(modalWindowButton);

    modalWindowContainer.appendChild(modalWindow);

    document.body.appendChild(modalWindowContainer);
  }

  const pressedKeys = [];

  function addEventListenerOnTheButton(clickedLetter, button) {
    if (pressedKeys.includes(clickedLetter)) {
      return;
    }

    pressedKeys.push(clickedLetter);

    if (infoWord.includes(clickedLetter)) {
      for (let index = 0; index < infoWord.length; index++) {
        if (infoWord[index] === clickedLetter) {
          const letterDivActive = document.querySelector(
            ".word-guessing-dashboard__word__letter:nth-child(" +
            (index + 1) +
            ")",
          );
          if (letterDivActive) {
            letterDivActive.classList.remove(
              "word-guessing-dashboard__word__letter",
            );
            letterDivActive.classList.add(
              "word-guessing-dashboard__word__active-letter",
            );
            letterDivActive.innerText = clickedLetter;
            button.classList.add("inactive");
          }
        }
      }
    } else {
      button.classList.add("wrong");
      const number = document.querySelector(
        ".word-guessing-dashboard__count-of-guesses__number",
      );

      if (parseFloat(number.innerText) <= 5) {
        const newNumber = parseFloat(number.innerText) + 1;
        number.textContent = newNumber;
        const img = document.createElement("img");
        img.classList.add("hangman-tool", hangmanToolClasses[newNumber]);
        img.src = "./assets/" + hangmanToolImages[newNumber];
        img.alt = hangmanToolClasses[newNumber];
        hangmanToolDiv.appendChild(img);
        setTimeout(() => {
          img.style.opacity = 1;
        }, 100);
      }

      if (parseFloat(number.innerText) >= 6) {
        return createSadModalWindow();
      }
    }

    const wordContainer = document.querySelector(
      ".word-guessing-dashboard__word",
    );
    const activeLetters = wordContainer.querySelectorAll(
      ".word-guessing-dashboard__word__active-letter",
    );

    if (wordContainer.children.length === activeLetters.length) {
      return createHappyModalWindow();
    }

  }

  function addEventListenerOnTheButtonOfKeyword(event) {
    const pressedKey = event.key.toUpperCase();

    if (pressedKeys.includes(pressedKey)) {
      return;
    }

    const char = String.fromCharCode(event.which);
    const button = buttons.find((elem) => elem.textContent === pressedKey);

    if (button) {
      addEventListenerOnTheButton(pressedKey, button);
    } else if (/^[a-zA-Z]$/.test(char)) {
      return createKeyboardModalWindow();
    }
  }

  function createKeyboardModalWindow() {
    const previousKeyboardModal = document.querySelector(".keyboard-modal-window-container");
    if (previousKeyboardModal) {
      previousKeyboardModal.remove();
    }

    const modalKeyboardWindowContainer = document.createElement("section");
    modalKeyboardWindowContainer.className = "keyboard-modal-window-container";
    modalKeyboardWindowContainer.style.display = "flex";

    const modalKeyboardWindow = document.createElement("section");
    modalKeyboardWindow.className = "keyboard-modal-window";

    const keyboard = document.createElement("img");
    keyboard.className = "keyboard-image";
    keyboard.src = "./assets/keyboard.png";
    keyboard.alt = "keyboard-image";

    const warning = document.createElement("p");
    warning.className = "keyboard-modal-window__warning";
    warning.textContent = "Please check your keyboard layout";

    modalKeyboardWindow.appendChild(warning);
    modalKeyboardWindow.appendChild(keyboard);

    modalKeyboardWindowContainer.appendChild(modalKeyboardWindow);

    document.body.appendChild(modalKeyboardWindowContainer);

    document.body.addEventListener("click", () => {
      if (document.querySelector(".keyboard-modal-window-container")) {
        document.querySelector(".keyboard-modal-window-container").remove();
      }
    }
    );
  }
}

callRecursiveGame();
