/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board, player

/*------------------------ Cached Element References ------------------------*/
const circle = document.querySelectorAll('section > div')
const topMessage = document.querySelector('#message')
const resetButton = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/
// circle.addEventListener('click')


/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  console.log(board)
  player = 1
  render()
}

// Need event listeners for click, reset, (computer-mode at the end)
// Initialize an init function, put a const of board with 42 nulls
// Game needs to be rendered to user
// Name the Constant of winningcombos (find a way to avoid hard-coding, but if all else fails, hard-code) (look into window sliding method)
// Need a Click function so player can click on divs
// Need a function for a winner
// Reset function
// Add a Computer Challenge Mode
// Add Special designs to game



