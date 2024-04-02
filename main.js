const btnBust = document.querySelector(".btn-bust");

const gameMsg = document.querySelector(".game-info-msg");
const gameBusts = document.querySelector(".game-info-busts");

let bustMode = false;
let end = false;

let credits = 16;
let score = 0;
let remainingBusts = 2;

const numRows = 9;
const numCols = 12;

const btnPeep = document.querySelector(".btn-peep");

btnPeep.addEventListener("click", () => {
  toggleProbabilities();
});

function toggleCellColor(event) {
  if (credits > 0 && bustMode == false && end == false) {
    const cell = event.target;

    const clickedCellIndex = Array.from(
      document.querySelectorAll(".grid-cell")
    ).indexOf(cell);

    const clickedRow = Math.floor(clickedCellIndex / numCols);
    const clickedCol = clickedCellIndex % numCols;

    const ghostCellIndex = Array.from(
      document.querySelectorAll(".grid-cell")
    ).findIndex((cell) => cell.classList.contains("ghost"));

    const ghostRow = Math.floor(ghostCellIndex / numCols);
    const ghostCol = ghostCellIndex % numCols;

    const rowDistance = Math.abs(clickedRow - ghostRow);
    const colDistance = Math.abs(clickedCol - ghostCol);

    const overallDistance = Math.max(rowDistance, colDistance);

    credits--;
    updateCredits();

    let color;
    if (overallDistance >= 5) {
      color = "green";
    } else if (overallDistance == 4 || overallDistance == 3) {
      color = "yellow";
    } else if (overallDistance == 2 || overallDistance == 1) {
      color = "orange";
    } else {
      color = "red";
    }

    cell.style.backgroundColor = color;

    probabilities(cell);

    if (credits == 0) {
      gameMsg.innerHTML = "You have no more credits";
      document.querySelector(".grid-container").style.cursor = "not-allowed";
    }
    getDirection(clickedRow, clickedCol, ghostRow, ghostCol);

    let directionOutput = getDirection(
      clickedRow,
      clickedCol,
      ghostRow,
      ghostCol
    );
    if (direction == true) {
      if (directionOutput === "south") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.top = null;
        svg.style.bottom = "5px";
        svg.style.right = "0";
        svg.style.left = "50%";
        svg.style.transform = "translateX(-50%)";
      } else if (directionOutput === "southwest") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.top = null;
        svg.style.bottom = "5px";
        svg.style.right = "0";
        svg.style.left = "30%";
        svg.style.transform = "rotate(45deg)";
      } else if (directionOutput === "southeast") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.top = null;
        svg.style.bottom = "5px";
        svg.style.right = "0";
        svg.style.left = "30%";
        svg.style.transform = "rotate(-45deg)";
      } else if (directionOutput === "north") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.top = "5px";
        svg.style.right = "0";
        svg.style.left = "30%";
        svg.style.transform = "rotate(180deg)";
      } else if (directionOutput === "northwest") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.bottom = "0";
        svg.style.top = "5px";
        svg.style.right = "0";
        svg.style.left = "30%";
        svg.style.transform = "rotate(135deg)";
      } else if (directionOutput === "northeast") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.bottom = "0";
        svg.style.top = "5px";
        svg.style.right = "0";
        svg.style.left = "30%";
        svg.style.transform = "rotate(225deg)";
      } else if (directionOutput === "east") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.bottom = "0";
        svg.style.top = "55%";
        svg.style.right = "0";
        svg.style.left = "60%";
        svg.style.transform = "rotate(-90deg)";
      } else if (directionOutput === "west") {
        cell.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.bottom = "0";
        svg.style.top = "55%";
        svg.style.left = "0";
        svg.style.right = "60%";
        svg.style.transform = "rotate(90deg)";
      }
    }
  }
}

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("width", "24");
svg.setAttribute("height", "24");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("fill", "none");
svg.setAttribute("stroke", "currentColor");
svg.setAttribute("stroke-width", "2");
svg.setAttribute("stroke-linecap", "round");
svg.setAttribute("stroke-linejoin", "round");
svg.classList.add("lucide", "lucide-arrow-big-down", "arrow-icon");

const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M15 6v6h4l-7 7-7-7h4V6h6z");

svg.appendChild(path);

const directionIcon = document.querySelector(".direction-icon");
const directionActivation = document.querySelector(".direction-activation");

let direction = false;

directionIcon.addEventListener("click", () => {
  if (direction == false) {
    directionIcon.style.color = "lightgreen";
    direction = true;
    directionActivation.style.opacity = 1;
    directionActivation.classList.add("zigzag");
    directionInfo.innerText = directionY + " " + directionX;
  } else {
    directionIcon.style.color = "";
    direction = false;
    directionActivation.style.opacity = 0;
    directionActivation.classList.remove("zigzag");
    directionInfo.innerText = "";
  }
});

const directionInfo = document.querySelector(".direction-info");
let directionX = "";
let directionY = "";
function getDirection(clickedRow, clickedCol, ghostRow, ghostCol) {
  const dx = ghostCol - clickedCol;
  const dy = ghostRow - clickedRow;

  const adx = Math.abs(dx);
  const ady = Math.abs(dy);

  let directionX = "";
  let directionY = "";
  if (dx > 0) {
    directionX = "east";
  } else if (dx < 0) {
    directionX = "west";
  }

  if (dy > 0) {
    directionY = "south";
  } else if (dy < 0) {
    directionY = "north";
  }

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (direction == true) {
    directionInfo.innerText = directionY + "\u00A0\u00A0\u00A0" + directionX;
  } else {
    directionInfo.innerText = "";
  }
  return directionY + directionX;
}

let zeroArr = [];
function probabilities(cell) {
  const cellColor = cell.style.backgroundColor;
  const gridCells = document.querySelectorAll(".grid-cell");
  const clickedCellIndex = Array.from(gridCells).indexOf(cell);
  const clickedRow = Math.floor(clickedCellIndex / numCols);
  const clickedCol = clickedCellIndex % numCols;

  gridCells.forEach((cell) => {
    if (cell.innerText === "") {
      cell.innerText = 0.001;
    }
  });

  if (cellColor === "green") {
    const cellsWithinRadius = [];
    const cellsOutsideRadius = [];

    gridCells.forEach((cell, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      const rowDistance = Math.abs(clickedRow - row);
      const colDistance = Math.abs(clickedCol - col);

      if (rowDistance <= 4 && colDistance <= 4) {
        cellsWithinRadius.push(cell);
      } else if (!zeroArr.includes(cell)) {
        cellsOutsideRadius.push(cell);
      }
    });

    cellsWithinRadius.forEach((cell) => {
      cell.innerText = 0.001;
      cell.style.color = "red";
      zeroArr.push(cell);
    });

    const probabilityOutsideRadius = 1 / cellsOutsideRadius.length;

    cellsOutsideRadius.forEach((cell) => {
      if (cell.innerText !== 0) {
        cell.innerText = probabilityOutsideRadius.toFixed(3);
      }
    });
  } else if (cellColor === "yellow") {
    const cellsWithinRadius = [];
    const cellsOutsideRadius = [];

    gridCells.forEach((cell, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      const rowDistance = Math.abs(clickedRow - row);
      const colDistance = Math.abs(clickedCol - col);

      if (rowDistance <= 2 && colDistance <= 2) {
        cellsWithinRadius.push(cell);
      } else if (!zeroArr.includes(cell)) {
        if (rowDistance < 5 && colDistance < 5) {
          cellsOutsideRadius.push(cell);
        }
      }
    });

    cellsWithinRadius.forEach((cell) => {
      cell.innerText = 0.001;
      cell.style.color = "red";
      zeroArr.push(cell);
    });

    const probabilityOutsideRadius = 1 / cellsOutsideRadius.length;

    cellsOutsideRadius.forEach((cell) => {
      if (cell.innerText !== 0) {
        cell.innerText = probabilityOutsideRadius.toFixed(3);
      }
    });
  }

  if (cellColor === "orange") {
    const cellsWithinRadius = [];
    const cellsOutsideRadius = [];

    gridCells.forEach((cell, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      const rowDistance = Math.abs(clickedRow - row);
      const colDistance = Math.abs(clickedCol - col);

      if (rowDistance < 1 && colDistance < 1) {
        cellsWithinRadius.push(cell);
      } else if (!zeroArr.includes(cell)) {
        if (rowDistance < 3 && colDistance < 3 && cell.style.color !== "red") {
          cellsOutsideRadius.push(cell);
        } else {
          cell.style.color = "red";
        }
      }
    });

    cellsWithinRadius.forEach((cell) => {
      cell.innerText = 0.001;
      cell.style.color = "red";
      zeroArr.push(cell);
    });

    const probabilityOutsideRadius = 1 / cellsOutsideRadius.length;

    cellsOutsideRadius.forEach((cell) => {
      if (cell.innerText !== 0) {
        cell.innerText = probabilityOutsideRadius.toFixed(3);
      }
    });
  } else if (cellColor === "red") {
    gridCells.forEach((cell, index) => {
      cell.innerText = 0.001;
      cell.style.color = "red";
    });
    cell.innerText = 0.893;
    cell.style.color = "black";
  }

  const totalProbability = Array.from(gridCells).reduce((acc, cell) => {
    return acc + parseFloat(cell.innerText);
  }, 0);

  if (totalProbability !== 0) {
    gridCells.forEach((cell) => {
      cell.innerText = (parseFloat(cell.innerText) / totalProbability).toFixed(
        3
      );
    });
  }
}

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach((cell) => {
  if (end == false) {
    cell.addEventListener("click", toggleCellColor);
  }
});

function lost() {
  document.querySelector(".grid-container").style.cursor = "not-allowed";
  end = true;
  bustMode = false;

  gridCells.forEach((cell) => {
    cell.addEventListener("click", null);
  });
}

function gameEnd() {
  end = true;

  gridCells.forEach((cell) => {
    cell.addEventListener("click", null);
  });
}

function bust() {
  btnBust.addEventListener("click", () => {
    if (remainingBusts > 0 && end == false) {
      btnBust.style.backgroundColor = "rgb(106, 104, 104)";
      btnBust.style.boxShadow = "inset 0 0 4px white";
      bustMode = true;
      document.querySelector(".grid-container").style.cursor = "crosshair";
    } else if (remainingBusts == 0) {
      animateRemainingBusts();
      gameMsg.innerHTML = "You have no remaining bust attempts";
      lost();
    }
  });

  gridCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (bustMode && remainingBusts > 0) {
        const clickedCellIndex = Array.from(gridCells).indexOf(cell);
        const ghostCellIndex = Array.from(gridCells).findIndex((cell) =>
          cell.classList.contains("ghost")
        );

        remainingBusts--;
        updateBusts();

        btnBust.style.backgroundColor = "rgb(37, 114, 137)";
        btnBust.style.boxShadow = "0 0 0";

        bustMode = false;
        document.querySelector(".grid-container").style.cursor = "default";

        if (clickedCellIndex === ghostCellIndex) {
          gridCells[ghostCellIndex].style.backgroundRepeat = "no-repeat";
          gridCells[ghostCellIndex].style.backgroundImage =
            'url(\'data:image/svg+xml;utf8,<svg style="color: white; z-index: 10000;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12,2c-4.963,0-9,4.038-9,9v8h0.051c0.245,1.691,1.69,3,3.449,3c1.174,0,2.074-0.417,2.672-1.174 C9.896,21.551,10.896,22,12,22c1.11,0,2.114-0.456,2.84-1.188C15.441,21.574,16.344,22,17.5,22c1.93,0,3.5-1.57,3.5-3.5V11 C21,6.038,16.963,2,12,2z M19,18.5c0,0.827-0.673,1.5-1.5,1.5c-0.449,0-1.5,0-1.5-2v-1h-2v1c0,1.103-0.897,2-2,2s-2-0.897-2-2v-1H8 v1c0,1.845-0.774,2-1.5,2C5.673,20,5,19.327,5,18.5V11c0-3.86,3.141-7,7-7s7,3.14,7,7V18.5z"></path><circle cx="9" cy="10" r="2"></circle><circle cx="15" cy="10" r="2"></circle></svg>\')';

          gridCells[ghostCellIndex].classList.add("ghost-killed");

          gameMsg.innerHTML = "YOU WON !";

          score = credits + 80;
          updateScore();

          bustMode = false;

          document.getElementById("fire").classList.add("firework");
          gameEnd();
        } else {
          gameMsg.innerHTML = "No ghost in this cell";
          animateRemainingBusts();
          if (remainingBusts === 0) {
            lost();
          }
        }
      }
    });
  });
}

function animateRemainingBusts() {
  gameBusts.style.color = "red";
  gameBusts.classList.add("animate-busts");
  setTimeout(() => {
    gameBusts.classList.remove("animate-busts");
  }, 400);
}

let peepToggle = false;

function toggleProbabilities() {
  const gridCells = document.querySelectorAll(".grid-cell");
  const probability = 1 / gridCells.length;

  if (credits == 16) {
    if (peepToggle == false) {
      gridCells.forEach((cell) => {
        cell.innerText = probability.toFixed(3);
        cell.style.fontSize = "18px";
      });
      peepToggle = true;
      btnPeep.style.backgroundColor = "lightgreen";
    } else {
      gridCells.forEach((cell) => {
        cell.style.fontSize = "0px";
      });
      peepToggle = false;
      btnPeep.style.backgroundColor = "";
    }
  } else {
    if (peepToggle == false) {
      gridCells.forEach((cell) => {
        cell.style.fontSize = "18px";
      });
      peepToggle = true;
      btnPeep.style.backgroundColor = "lightgreen";
    } else {
      gridCells.forEach((cell) => {
        cell.style.fontSize = "0px";
      });
      peepToggle = false;
      btnPeep.style.backgroundColor = "";
    }
  }
}

function sampleUniformDistribution() {
  return Math.floor(Math.random() * numRows * numCols);
}

function placeGhost() {
  const cellIndex = sampleUniformDistribution();
  const row = Math.floor(cellIndex / numCols);
  const col = cellIndex % numCols;
  const cell = document.querySelector(`.grid-cell:nth-child(${cellIndex + 1})`);
  cell.classList.add("ghost");
  console.log("Ghost coordinates (x, y):", col + 1, row + 1);
}

const creditsNumber = document.querySelector(".credits-number");

const scoreNumber = document.querySelector(".score-number");

const bustsNumber = document.querySelector(".busts-number");

function updateCredits() {
  creditsNumber.innerHTML = credits;
}

function updateBusts() {
  bustsNumber.innerHTML = remainingBusts;
  {
  }
}

function updateScore() {
  scoreNumber.innerHTML = score;
}

updateCredits();
updateBusts();
updateScore();

placeGhost();
bust();

const gameHelpGhost = document.querySelector(".game-help-icon-ghost");
const gameHelpQuestion = document.querySelector(".game-help-icon-question");
const gameHelpContainer = document.querySelector(".game-help-container");

let gameHelp = false;

gameHelpGhost.addEventListener("click", () => {
  if (gameHelp == false) {
    gameHelpContainer.style.width = "310px";
    gameHelpGhost.style.backgroundColor = "rgb(17, 50, 60)";
    gameHelpContainer.style.opacity = 1;
    gameHelp = true;
  } else {
    gameHelpContainer.style.width = "0px";
    gameHelpGhost.style.backgroundColor = "";
    gameHelpContainer.style.opacity = 0;
    gameHelp = false;
  }
});
