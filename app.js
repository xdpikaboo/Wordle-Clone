const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

let isGameOver = false;
const wordle = "SUPER";
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

const tiles = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});

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

const handleClick = (key) => {
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
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6 && isGameOver == false) {
    const tile = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;
    tiles[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
    console.log(tiles);
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
  if (currentTile > 4 && isGameOver == false) {
    const guess = tiles[currentRow].join("");
    console.log(guess);
    flipTile();
    if (wordle == guess) {
      showMessage("Good Job!");
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        showMessage("U Suck!");
        isGameOver = true;
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
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
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute("data");

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
        addColorToKey(guess[(index.letter, guess[index].color)]);
      }, 500 * index);
    });
  });
};
