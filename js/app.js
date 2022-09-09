/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board, player, winner

/*------------------------ Cached Element References ------------------------*/
const circleSpace = document.querySelectorAll('section > div')
const topMessage = document.querySelector('#message')
const resetButton = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/
circleSpace.forEach(function(round) {
  round.addEventListener('click', handleClick)
})


/*-------------------------------- Functions --------------------------------*/

// init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  // console.log(board)
  player = 1
  // render()
}

function render() {
  board.forEach((circle, sqIdx) => {
    if (circle === 1) {
      circleSpace[sqIdx].classList.add('red-piece')
    } if (circle === -1) {
      circleSpace[sqIdx].classList.add('yellow-piece')
    } else if (circle === null) {
      circleSpace[sqIdx].textContent = ''
    }
  })
    if (winner === null){
      topMessage.textContent = `Player ${turn === 1 ? "red's" : "yellow's"} turn`
      //make tie function later
    } else {
      topMessage.textContent = `Player ${turn === 1 ? "red" : "yellow"} wins`
    }
}

function handleClick(evt) {
  let index = (evt.target.id.replace('NaN', ''))
  console.log(index)
  // if(board[index] || winner) {
  //   return
  // }
  // board[index] = turn
  // turn *= -1
  // winner = gotWinner()
  // render()
}
// Need event listeners for click, reset, (computer-mode at the end)
// Game needs to be rendered to user
// Name the Constant of winningcombos (find a way to avoid hard-coding, but if all else fails, hard-code) (look into window sliding method)
// Need a Click function so player can click on divs
// Need a function for a winner
// Reset function
// Add a Computer Challenge Mode
// Add Special designs to game



