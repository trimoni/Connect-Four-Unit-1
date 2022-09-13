/*-------------------------------- Constants --------------------------------*/

const winningArrays = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

const michaelNoises = new Audio("../audio/Mike-1.mp3");
const backgroundNoise = new Audio("../audio/SlyDance2.mp3");
const beatIt = new Audio("../audio/beat-it.mp3");
const bad = new Audio('../audio/bad.mp3')
/*---------------------------- Variables (state) ----------------------------*/
let board = Array(42).fill(null),
  winner,
  turn,
  tie;

/*------------------------ Cached Element References ------------------------*/
const circleSpace = document.querySelectorAll("section > div");
const topMessage = document.querySelector("#message");
const reset = document.getElementById("resetBtn");
const element = document.querySelector(".animate__animated animate__bounce");
const otherSoundBoard = document.querySelector("#board");
const danceSong = document.querySelector("#music");
/*----------------------------- Event Listeners -----------------------------*/
circleSpace.forEach(
  (circle, index) => circle.addEventListener("click", () => handleClick(index))
  // we are clicking on a circle (div), the index is the value index of each circle (div).
  // We are grabbing the index value from the circle (div) and we will move it around to other functions that will need to use it.
);

reset.addEventListener("click", init);

danceSong.addEventListener("click", playMusic);

otherSoundBoard.addEventListener("click", function (evt) {
  const randomNum = Math.floor(Math.random() * 15 - 1 + 1);
  const audioElement = new Audio(`../audio/Mike-${randomNum}.mp3`);
  audioElement.volume = 0.5;
  audioElement.play();
});

// soundNoise.addEventListener()

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  board.fill(null);
  winner = false;
  tie = false;
  turn = 1;
  for (let i = 0; i < circleSpace.length; i++) {
    circleSpace[i].style.backgroundColor = "white";
  }
  // loop through the divs, and will give the index value of circleSpace a color of white for every new game/reset
  updateMessage();
}

function playMusic() {
  backgroundNoise.play();
  backgroundNoise.loop = true;
}

function handleClick(index) {
  if (winner) return;
  // if winner is false, keep playing the game
  render(index);
  // as long as there isn't a winner, render function will activate
}

function getClassIndex(index) {
  const bottomArray = [6, 5, 4, 3, 2, 1, 0];
  // this targets the bottom row
  let classIndex = bottomArray[index % 7];
  let boot = document.querySelector(`#sq${classIndex}`);
  // the bottom row, each value is getting a divisible of 7
  let color = boot.style.backgroundColor;
  while (color === "red" || color === "yellow") {
    // grabbing the sq id's in the bottom row
    classIndex += 7;
    boot = document.querySelector(`#sq${classIndex}`);
    color = boot.style.backgroundColor;
  }
  return classIndex;
}

function updateBoard(index) {
  board[index] = turn;
  const backgroundColor = turn === 1 ? "red" : "yellow";
  let circle = document.querySelector(`#sq${index}`);
  circle.style.backgroundColor = backgroundColor;
}

function checkIfWinner() {
  winner = winningArrays.some(
    (combo) =>
      Math.abs(
        board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]]
      ) === 4
  );
}

function checkIfTie() {
  if (!board.includes(null)) tie = true;
}

function switchPlayerTurn() {
  if (winner === false) turn *= -1;
}

function updateMessage() {
  topMessage.innerText = `PLAYER ${turn > 0 ? "🔴" : "🟡"}`;
  if (tie) {
    topMessage.innerText = `Tie game`;
    setTimeout(function () {
      bad.play();
    }, 0500);
  }
  if (winner) {
    topMessage.innerText = `Player ${turn > 0 ? "🔴" : "🟡"} wins`;
    setTimeout(function () {
      beatIt.play();
    }, 0500);
  }
}

function render(index) {
  const classIndex = getClassIndex(index);

  updateBoard(classIndex);
  checkIfTie();
  checkIfWinner();
  switchPlayerTurn();
  updateMessage();
}

var t = 1;
var radius = 50;
var squareSize = 6.5;
var prec = 19.55;
var fuzzy = 0.001;
var inc = (Math.PI - fuzzy) / prec;
var discoBall = document.getElementById("discoBall");

for (var t = fuzzy; t < Math.PI; t += inc) {
  var z = radius * Math.cos(t);
  var currentRadius =
    Math.abs(
      radius * Math.cos(0) * Math.sin(t) -
        radius * Math.cos(Math.PI) * Math.sin(t)
    ) / 2.5;
  var circumference = Math.abs(2 * Math.PI * currentRadius);
  var squaresThatFit = Math.floor(circumference / squareSize);
  var angleInc = (Math.PI * 2 - fuzzy) / squaresThatFit;
  for (var i = angleInc / 2 + fuzzy; i < Math.PI * 2; i += angleInc) {
    var square = document.createElement("div");
    var squareTile = document.createElement("div");
    squareTile.style.width = squareSize + "px";
    squareTile.style.height = squareSize + "px";
    squareTile.style.transformOrigin = "0 0 0";
    squareTile.style.webkitTransformOrigin = "0 0 0";
    squareTile.style.webkitTransform =
      "rotate(" + i + "rad) rotateY(" + t + "rad)";
    squareTile.style.transform = "rotate(" + i + "rad) rotateY(" + t + "rad)";
    if ((t > 1.3 && t < 1.9) || (t < -1.3 && t > -1.9)) {
      squareTile.style.backgroundColor = randomColor("bright");
    } else {
      squareTile.style.backgroundColor = randomColor("any");
    }
    square.appendChild(squareTile);
    square.className = "square";
    squareTile.style.webkitAnimation = "reflect 2s linear infinite";
    squareTile.style.webkitAnimationDelay =
      String(randomNumber(0, 20) / 10) + "s";
    squareTile.style.animation = "reflect 2s linear infinite";
    squareTile.style.animationDelay = String(randomNumber(0, 20) / 10) + "s";
    squareTile.style.backfaceVisibility = "hidden";
    var x = radius * Math.cos(i) * Math.sin(t);
    var y = radius * Math.sin(i) * Math.sin(t);
    square.style.webkitTransform =
      "translateX(" +
      Math.ceil(x) +
      "px) translateY(" +
      y +
      "px) translateZ(" +
      z +
      "px)";
    square.style.transform =
      "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
    discoBall.appendChild(square);
  }
}

function randomColor(type) {
  var c;
  if (type == "bright") {
    c = randomNumber(130, 255);
  } else {
    c = randomNumber(110, 190);
  }
  return "rgb(" + c + "," + c + "," + c + ")";
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
