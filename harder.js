const wordsDisplay = document.querySelector(".words-container");
const buttons = document.querySelector(".button-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

let isGameOver1 = false;
let isGameOver2 = false;
let isGameOver3 = false;
let isGameOver4 = false;
let isGameOver5 = false;
let wordle1;
let wordle2;
let wordle3;
let wordle4;
let wordle5;
let line;
let tiles;
let words;
let size = 5;
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
      wordle1 = json[0].toUpperCase();
      console.log(wordle1);
    })
    .catch((error) => console.log(error));
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
      wordle2 = json[0].toUpperCase();
      console.log(wordle2);
    })
    .catch((error) => console.log(error));
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
      wordle3 = json[0].toUpperCase();
      console.log(wordle3);
    })
    .catch((error) => console.log(error));
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
      wordle4 = json[0].toUpperCase();
      console.log(wordle4);
    })
    .catch((error) => console.log(error));
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
      wordle5 = json[0].toUpperCase();
      console.log(wordle5);
    })
    .catch((error) => console.log(error));
};
getWordle();

let currentRow = 0;
let currentTile = 0;

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});

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
hard.textContent = "This is too hard!";
hard.addEventListener("click", () => (window.location.href = "hard.html"));
buttons.append(hard);

const render = () => {
  words = [];
  line = [];
  tiles = [];
  for (let i = 0; i < size; i++) {
    line.push("");
  }
  for (let i = 0; i < 6; i++) {
    tiles.push(line);
  }
  for (let i = 0; i < 5; i++) {
    words.push(tiles);
  }
  words.forEach((tiles, wordIndex) => {
    const wordElement = document.createElement("div");
    wordElement.setAttribute("id", "word-" + wordIndex);
    wordElement.classList.add("tile-container");
    tiles.forEach((row, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.setAttribute("id", "word-" + wordIndex + "-row-" + rowIndex);
      row.forEach((tile, tileIndex) => {
        const tileElement = document.createElement("div");
        tileElement.setAttribute(
          "id",
          "word-" + wordIndex + "-row-" + rowIndex + "-tile-" + tileIndex
        );
        tileElement.classList.add("tile");
        rowElement.append(tileElement);
      });
      wordElement.append(rowElement);
    });
    wordsDisplay.append(wordElement);
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
    currentRow = 0;
    currentTile = 0;
    isGameOver1 = false;
    isGameOver2 = false;
    isGameOver3 = false;
    isGameOver4 = false;
    isGameOver5 = false;
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
    currentRow = 0;
    currentTile = 0;
    isGameOver1 = false;
    isGameOver2 = false;
    isGameOver3 = false;
    isGameOver4 = false;
    isGameOver5 = false;
    render();
  }
};

const resetGame = () => {
  getWordle();
  const tiles = document.querySelectorAll(".tile-container");
  tiles.forEach((tile) => {
    tile.remove();
  });
  currentRow = 0;
  currentTile = 0;
  isGameOver1 = false;
  isGameOver2 = false;
  isGameOver3 = false;
  isGameOver4 = false;
  isGameOver5 = false;
  render();
};

const handleClick = (key) => {
  if (!isGameOver1 || !isGameOver2 || !isGameOver3) {
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
  if (currentTile < size && currentRow < 6) {
    if (!isGameOver1) {
      const tile1 = document.getElementById(
        "word-0" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile1.textContent = letter;
      words[0][currentRow][currentTile] = letter;
      tile1.setAttribute("data", letter);
    }
    if (!isGameOver2) {
      const tile2 = document.getElementById(
        "word-1" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile2.textContent = letter;
      words[1][currentRow][currentTile] = letter;
      tile2.setAttribute("data", letter);
    }
    if (!isGameOver3) {
      const tile3 = document.getElementById(
        "word-2" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile3.textContent = letter;
      words[2][currentRow][currentTile] = letter;
      tile3.setAttribute("data", letter);
    }
    if (!isGameOver4) {
      const tile4 = document.getElementById(
        "word-3" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile4.textContent = letter;
      words[3][currentRow][currentTile] = letter;
      tile4.setAttribute("data", letter);
    }
    if (!isGameOver5) {
      const tile5 = document.getElementById(
        "word-4" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile5.textContent = letter;
      words[4][currentRow][currentTile] = letter;
      tile5.setAttribute("data", letter);
    }
    if (
      !isGameOver1 ||
      !isGameOver2 ||
      !isGameOver3 ||
      !isGameOver4 ||
      !isGameOver5
    ) {
      currentTile++;
    }
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    if (!isGameOver1 || !isGameOver2 || !isGameOver3) {
      currentTile--;
    }
    if (!isGameOver1) {
      const tile1 = document.getElementById(
        "word-0" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile1.textContent = "";
      words[0][currentRow][currentTile] = "";
      tile1.setAttribute("data", "");
    }
    if (!isGameOver2) {
      const tile2 = document.getElementById(
        "word-1" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile2.textContent = "";
      words[1][currentRow][currentTile] = "";
      tile2.setAttribute("data", "");
    }
    if (!isGameOver3) {
      const tile3 = document.getElementById(
        "word-2" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile3.textContent = "";
      words[2][currentRow][currentTile] = "";
      tile3.setAttribute("data", "");
    }
    if (!isGameOver4) {
      const tile4 = document.getElementById(
        "word-3" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile4.textContent = "";
      words[3][currentRow][currentTile] = "";
      tile4.setAttribute("data", "");
    }
    if (!isGameOver5) {
      const tile5 = document.getElementById(
        "word-4" + "-row-" + currentRow + "-tile-" + currentTile
      );
      tile5.textContent = "";
      words[4][currentRow][currentTile] = "";
      tile5.setAttribute("data", "");
    }
  }
};

const checkRow = () => {
  if (currentRow >= 5) {
    showMessage(
      "Game Over! Words are " +
        wordle1 +
        "," +
        wordle2 +
        "," +
        wordle3 +
        "," +
        wordle4 +
        "," +
        wordle5
    );
  }
  const guess = words[0][currentRow].join("");
  console.log("guess", guess);
  if (
    currentTile > size - 1 &&
    (!isGameOver1 ||
      !isGameOver2 ||
      !isGameOver3 ||
      !isGameOver4 ||
      !isGameOver5)
  ) {
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
          if (wordle1 == guess) {
            showMessage("Good Job!");
            isGameOver1 = true;
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
            return;
          } else if (wordle2 == guess) {
            showMessage("Good Job!");
            isGameOver2 = true;
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
            return;
          } else if (wordle3 == guess) {
            showMessage("Good Job!");
            isGameOver3 = true;
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
            return;
          } else if (wordle4 == guess) {
            showMessage("Good Job!");
            isGameOver4 = true;
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
            return;
          } else if (wordle5 == guess) {
            showMessage("Good Job!");
            isGameOver5 = true;
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
            return;
          } else {
            if (currentRow >= 5) {
              showMessage(
                "Game Over! Words are " +
                  wordle1 +
                  "," +
                  wordle2 +
                  "," +
                  wordle3 +
                  "," +
                  wordle4 +
                  "," +
                  wordle5
              );
              isGameOver1 = true;
              isGameOver2 = true;
              isGameOver3 = true;
              isGameOver4 = true;
              isGameOver5 = true;
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
  if (!isGameOver1) {
    const rowTiles1 = document.querySelector(
      "#word-" + 0 + "-row-" + currentRow
    ).childNodes;
    let checkWordle1 = wordle1;
    const guess1 = [];
    rowTiles1.forEach((tile) => {
      guess1.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });
    guess1.forEach((guess, index) => {
      if (guess.letter == wordle1[index]) {
        guess.color = "green-overlay";
        checkWordle1 = checkWordle1.replace(guess.letter, "");
      }
    });
    guess1.forEach((guess) => {
      if (checkWordle1.includes(guess.letter)) {
        guess.color = "yellow-overlay";
        checkWordle1 = checkWordle1.replace(guess.letter, "");
      }
    });
    rowTiles1.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess1[index].color);
        addColorToKey(guess1[index].letter, guess1[index].color);
      }, 375 * index);
    });
  }

  if (!isGameOver2) {
    const rowTiles2 = document.querySelector(
      "#word-" + 1 + "-row-" + currentRow
    ).childNodes;
    let checkWordle2 = wordle2;
    const guess2 = [];
    rowTiles2.forEach((tile) => {
      guess2.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });
    guess2.forEach((guess, index) => {
      if (guess.letter == wordle2[index]) {
        guess.color = "green-overlay";
        checkWordle2 = checkWordle2.replace(guess.letter, "");
      }
    });
    guess2.forEach((guess) => {
      if (checkWordle2.includes(guess.letter)) {
        guess.color = "yellow-overlay";
        checkWordle2 = checkWordle2.replace(guess.letter, "");
      }
    });
    rowTiles2.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess2[index].color);
        addColorToKey(guess2[index].letter, guess2[index].color);
      }, 375 * index);
    });
  }

  if (!isGameOver3) {
    const rowTiles3 = document.querySelector(
      "#word-" + 2 + "-row-" + currentRow
    ).childNodes;
    let checkWordle3 = wordle3;
    const guess3 = [];
    rowTiles3.forEach((tile) => {
      guess3.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });
    guess3.forEach((guess, index) => {
      if (guess.letter == wordle3[index]) {
        guess.color = "green-overlay";
        checkWordle3 = checkWordle3.replace(guess.letter, "");
      }
    });
    guess3.forEach((guess) => {
      if (checkWordle3.includes(guess.letter)) {
        guess.color = "yellow-overlay";
        checkWordle3 = checkWordle3.replace(guess.letter, "");
      }
    });
    rowTiles3.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess3[index].color);
        addColorToKey(guess3[index].letter, guess3[index].color);
      }, 375 * index);
    });
  }

  if (!isGameOver4) {
    const rowTiles4 = document.querySelector(
      "#word-" + 3 + "-row-" + currentRow
    ).childNodes;
    let checkWordle4 = wordle4;
    const guess4 = [];
    rowTiles4.forEach((tile) => {
      guess4.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });
    guess4.forEach((guess, index) => {
      if (guess.letter == wordle4[index]) {
        guess.color = "green-overlay";
        checkWordle4 = checkWordle4.replace(guess.letter, "");
      }
    });
    guess4.forEach((guess) => {
      if (checkWordle4.includes(guess.letter)) {
        guess.color = "yellow-overlay";
        checkWordle4 = checkWordle4.replace(guess.letter, "");
      }
    });
    rowTiles4.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess4[index].color);
        addColorToKey(guess3[index].letter, guess3[index].color);
      }, 375 * index);
    });
  }

  if (!isGameOver5) {
    const rowTiles5 = document.querySelector(
      "#word-" + 4 + "-row-" + currentRow
    ).childNodes;
    let checkWordle5 = wordle5;
    const guess5 = [];
    rowTiles5.forEach((tile) => {
      guess5.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });
    guess5.forEach((guess, index) => {
      if (guess.letter == wordle5[index]) {
        guess.color = "green-overlay";
        checkWordle5 = checkWordle5.replace(guess.letter, "");
      }
    });
    guess5.forEach((guess) => {
      if (checkWordle5.includes(guess.letter)) {
        guess.color = "yellow-overlay";
        checkWordle5 = checkWordle5.replace(guess.letter, "");
      }
    });
    rowTiles5.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess5[index].color);
        addColorToKey(guess5[index].letter, guess5[index].color);
      }, 375 * index);
    });
  }
};
