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
]
/*---------------------------- Variables (state) ----------------------------*/
let board = Array(42).fill(null), winner, turn, tie

/*------------------------ Cached Element References ------------------------*/
const circleSpace = document.querySelectorAll('section > div')
console.log(circleSpace)
const topMessage = document.querySelector('#message')
const reset = document.getElementById("resetBtn")
/*----------------------------- Event Listeners -----------------------------*/
circleSpace.forEach((circle, index) => circle.addEventListener('click', () => handleClick(index)))


reset.addEventListener('click', init)
// reset.addEventListener('click', () => {
//   circleSpace.forEach(input => input.remove = '')
// })


/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board.fill(null)
  winner = false
  tie = false
  turn = 1
  for (let i = 0; i < circleSpace.length; i++) {
    circleSpace[i].style.backgroundColor = 'white'
  }
  updateMessage()
}


function handleClick(index) {
  if ( winner) return
  render(index)
}

function checkIfWinner() {
    winner = winningArrays.some(combo => Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]]) === 4 )
}

function checkIfTie() {
  if (!board.includes(null)) tie = true
}

function switchPlayerTurn() {
  if (!winner) turn *= -1
}

function updateBoard(index) {
  board[index] = turn

  // for (let index in board) {
    // console.log(index)
      // if (board[index] === 1) circleSpace[index].style.backgroundColor = 'Red'
      // else if (board[index] === -1) circleSpace[index].style.backgroundColor = 'Yellow'
      // else if (board[index] === null)
      // circleSpace[index].style.backgroundColor = 'White'
      console.log(board)
      // }
      // circleSpace[index].style.backgroundColor = 'red'
 
      const backgroundColor = turn === 1 ? "red" : "yellow"
      let circle = document.querySelector(`#sq${index}`)
      circle.style.backgroundColor = backgroundColor
      console.log(turn)
}

function updateMessage() {
  topMessage.innerText = `It's ${turn > 0 ? 'Red' : 'Yellow'}s turn`
  if (tie) topMessage.innerText = `Tie game`
  if (winner) topMessage.innerText = `${turn > 0 ? 'Red' : 'Yellow'} wins`
}


function render(par) {
//  console.log(par % 7)

  const magicArray  = [6,5,4,3,2,1,0]
// this targets the bottom rom
  let classIndex = magicArray[par%7]
  let boot = document.querySelector(`#sq${classIndex}`)
  // the bottom row, each value is getting a divisible of 7
  let color = boot.style.backgroundColor
  while (color === "red" ||  color === "yellow"){
    // grabbing the sq id's in the bottom row
    // console.log(boot.style.backgroundColor)
    
    classIndex += 7
    boot = document.querySelector(`#sq${classIndex}`)
    color = boot.style.backgroundColor

    console.log(document.querySelector(`#sq${classIndex}`))
  
}
  console.log(color)
  
  

  updateBoard(classIndex)
  checkIfTie()
  checkIfWinner()
  switchPlayerTurn()
  updateMessage()
}

  // board.forEach((circle, sqIdx) => {
  //   if (circle === 1) {
  //     circleSpace[sqIdx].textContent = circleSpace[sqIdx].classList.add('red-piece')
  //   } if (circle === -1) {
  //     circleSpace[sqIdx].classList.add('yellow-piece')
  //   } else if (circle === null) {
  //     circleSpace[sqIdx].textContent = ''
  //   }
  // })
  //   if (winner === null){
  //     topMessage.textContent = `Player ${player === 1 ? "red's" : "yellow's"} turn`
  //     //make tie function later
  //   } else {
  //     topMessage.textContent = `Player ${player === 1 ? "red" : "yellow"} wins`
  //   }


// function handleClick(evt) {
//   let index = parseInt(evt.target.id.replace('sq', ''))
//   console.log(index)
  // if(board[index] || winner) {
  //   return
  // }
  // board[index] = player
  // player *= -1
  // winner = gotWinner()
  // render()

// Need event listeners for click, reset, (computer-mode at the end)
// Game needs to be rendered to user
// Name the Constant of winningcombos (find a way to avoid hard-coding, but if all else fails, hard-code) (look into window sliding method)
// Need a Click function so player can click on divs
// Need a function for a winner
// Reset function
// Add a Computer Challenge Mode
// Add Special designs to game





// [1, 2, 3, 4, 5, 6, 7],
//           [8, 9, 10, 11, 12, 13, 14],
//           [15, 16, 17, 18, 19, 20, 21],
//           [22, 23, 24, 25, 26, 27, 28],
//           [29, 30, 31, 32, 33, 34, 35],
//           [36, 37, 38, 39, 40, 41, 42]