const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

let isGameOver = false;
let wordle;

const getWordle = () => {
  fetch(
    "https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=5",
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
  const guess = tiles[currentRow].join("");
  console.log("guess", guess);
  if (currentTile > 4 && isGameOver == false) {
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
        addColorToKey(guess[index].letter, guess[index].color);
      }, 375 * index);
    });
  });
};
