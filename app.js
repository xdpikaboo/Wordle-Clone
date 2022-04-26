let tileDisplay = document.querySelector(".tile-container");
const wordsDisplay = document.querySelector(".words-container");
const buttons = document.querySelector(".button-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

let isGameOver = false;
let wordle;
let size = 5;
let line;
let tiles;
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

const getWordle = () => {
  fetch(
    "https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=" +
      size,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "random-words5.p.rapidapi.com",
        "x-rapidapi-key": "82d3059513msh2cf51c4b98b492dp1aa518jsnb06dd1b8449b",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      wordle = json[0].toUpperCase();
    })
    .catch((error) => console.log(error));
};
getWordle();

let currentRow = 0;
let currentTile = 0;

const inc = document.createElement("button");
inc.textContent = "+";
inc.addEventListener("click", () => increment());
buttons.append(inc);

const dec = document.createElement("button");
dec.textContent = "-";
dec.addEventListener("click", () => decrement());
buttons.append(dec);

const reset = document.createElement("button");
reset.textContent = "New game";
reset.addEventListener("click", () => resetGame());
buttons.append(reset);

const hard = document.createElement("button");
hard.textContent = "This is too ez~";
hard.addEventListener("click", () => (window.location.href = "hard.html"));
buttons.append(hard);

const render = () => {
  line = [];
  tiles = [];
  for (let i = 0; i < size; i++) {
    line.push("");
  }
  for (let i = 0; i < 6; i++) {
    tiles.push(line);
  }
  tiles.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "row-" + rowIndex);
    row.forEach((tile, tileIndex) => {
      const tileElement = document.createElement("div");
      tileElement.setAttribute("id", "row-" + rowIndex + "-tile-" + tileIndex);
      tileElement.classList.add("tile");
      rowElement.append(tileElement);
    });
    tileDisplay.append(rowElement);
  });
  console.log(tiles);
  keys.forEach((key) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleClick(key));
    keyboard.append(buttonElement);
  });
};

render();

const increment = () => {
  if (size == 10) {
    showMessage("Maximum wordle size is 10!");
  } else {
    size++;
    getWordle();
    const tiles = document.querySelectorAll(".tile-container");
    tiles.forEach((tile) => {
      tile.remove();
    });
    tileDisplay = document.createElement("div");
    tileDisplay.classList.add("tile-container");
    wordsDisplay.append(tileDisplay);
    const buttons = document.querySelectorAll(".key-container button");
    buttons.forEach((button) => {
      button.remove();
    });
    currentRow = 0;
    currentTile = 0;
    isGameOver = false;
    render();
  }
};

const decrement = () => {
  if (size == 4) {
    showMessage("Minimum wordle size is 4!");
  } else {
    size--;
    getWordle();
    const tiles = document.querySelectorAll(".tile-container");
    tiles.forEach((tile) => {
      tile.remove();
    });
    tileDisplay = document.createElement("div");
    tileDisplay.classList.add("tile-container");
    wordsDisplay.append(tileDisplay);
    const buttons = document.querySelectorAll(".key-container button");
    buttons.forEach((button) => {
      button.remove();
    });
    currentRow = 0;
    currentTile = 0;
    isGameOver = false;
    render();
  }
};

const resetGame = () => {
  getWordle();
  const tiles = document.querySelectorAll(".tile-container");
  tiles.forEach((tile) => {
    tile.remove();
  });
  tileDisplay = document.createElement("div");
  tileDisplay.classList.add("tile-container");
  wordsDisplay.append(tileDisplay);
  const buttons = document.querySelectorAll(".key-container button");
  buttons.forEach((button) => {
    button.remove();
  });
  currentRow = 0;
  currentTile = 0;
  isGameOver = false;
  render();
};

const handleClick = (key) => {
  if (!isGameOver) {
    console.log("clicked", key);
    if (key == "<<") {
      deleteLetter();
      return;
    }
    if (key == "ENTER") {
      checkRow();
      return;
    }
    addLetter(key);
  }
};

const addLetter = (letter) => {
  if (currentTile < size && currentRow < 6 && isGameOver == false) {
    const tile = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;
    tiles[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
  }
};

const deleteLetter = () => {
  if (currentTile > 0 && isGameOver == false) {
    currentTile--;
    const tile = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    tiles[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
    console.log(tiles);
  }
};

const checkRow = () => {
  if (currentRow >= 5) {
    showMessage("Game Over! Word is " + wordle);
  }
  const guess = tiles[currentRow].join("");
  console.log("guess", guess);
  if (currentTile > size - 1 && isGameOver == false) {
    fetch(
      "https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=" +
        guess,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
          "x-rapidapi-key":
            "82d3059513msh2cf51c4b98b492dp1aa518jsnb06dd1b8449b",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.result_msg == "Entry word not found") {
          showMessage("Not a Word!");
          return;
        } else {
          flipTile();
          if (wordle == guess) {
            showMessage("Good Job!");
            isGameOver = true;
            return;
          } else {
            if (currentRow >= 5) {
              showMessage("Game Over! Word is " + wordle);
              isGameOver = true;
              return;
            }
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
          }
        }
      })
      .catch((error) => console.log(error));
  }
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#row-" + currentRow).childNodes;
  let checkWordle = wordle;
  const guess = [];
  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
  });

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = "green-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 375 * index);
  });
};
