// Select all elements with class "box" and store them in the 'boxes' variable
const boxes = document.querySelectorAll(".box");

// Select elements with classes "game-info" and "btn" and store them in the 'gameInfo' and 'newGameBtn' variables

const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Declare variables to track the current player and the state of the game grid
let currentPlayer;
let gameGrid;
// Define winning positions for Tic-Tac-Toe
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to initialize the game
function initGame() {
    // Set the starting player to "X"
    currentPlayer = "X";
    
    // Initialize the game grid with empty values
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    
    // Remove the "active" class from the new game button
    newGameBtn.classList.remove("active");
    
    // Reset each box to its initial state
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Reinitialize box with CSS properties
        box.classList = `box box${index + 1}`;
    });

    // Display the current player in the game info
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Initialize the game when the script is loaded
initGame();
// Function to swap between "X" and "O" for the current player
function swap(){
    if(currentPlayer=== "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}


// Function to check if the game is over
function checkGameOver() {
    let answer = "";
    
    // Check each winning position
    winningPositions.forEach((position) => {
        // Check if the positions are filled with the same player's symbol
        if (
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])
        ) {
            // Set the answer to the winning player's symbol
            answer = gameGrid[position[0]];
            
            // Disable pointer events for all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Add "win" class to the winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
      //it means we have a winner
      if(answer!==""){
        gameInfo.innerText=` Congrats' Winner Player is- ${answer}`;
        newGameBtn.classList.add("active");
        return;
      }
      //We know, NO Winner Found, let's check whether there is tie
        // Check for a tie (no winner and all boxes filled)
      let fillCount=0;
      gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
      });

      if(fillCount===9){
        gameInfo.innerText="Game Tired!";
        newGameBtn.classList.add("active");
      }

}
// Function to handle clicks on boxes
function handleClick(index) {
    // Check if the gameGrid at the clicked index is empty
    if (gameGrid[index] === "") {
        // Update the box and gameGrid with the current player's symbol
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
     boxes[index].style.pointerEvents="none"
        // Swap to the other player
        swap();

        // Check if the game is over
        checkGameOver();
    }
}

// Attach event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
newGameBtn.addEventListener("click", initGame);