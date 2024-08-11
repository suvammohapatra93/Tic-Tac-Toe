console.log("Welcome to Tic-Tac-Toe");

// Prompt players to enter their names
let playerX = prompt("Enter the name for Player X:");
let playerO = prompt("Enter the name for Player O:");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameOver.mp3");
let drawSound = new Audio("draw.mp3"); // Add a sound for a draw
let turn = "x";
let gameover = false;

// Function to change the turn:
const changeTurn = () => {
  return turn === "X" || turn === "x" ? "O" : "x";
};

// Function to check for a win or draw:
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 0, 4.7, 0], // Horizontal top
    [3, 4, 5, 0, 14.7, 0], // Horizontal middle
    [6, 7, 8, 0, 24.7, 0], // Horizontal bottom
    [0, 3, 6, -10, 15, 90], // Vertical left
    [1, 4, 7, 0, 15, 90],  // Vertical middle
    [2, 5, 8, 10, 15, 90], // Vertical right
    [0, 4, 8, 0, 15, 45],  // Diagonal top-left to bottom-right
    [2, 4, 6, 0, 15, -45], // Diagonal top-right to bottom-left
  ];
  let isDraw = true;
  
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      gameover = true;
      isDraw = false;

      // Displaying the winner's name
      let winnerName = turn === "x" ? playerX : playerO;
      document.querySelector(".info").innerText = winnerName + " Won!";
      
      // Showing the winning line
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw"; // Adjusted width to match the winning combination

      // Displaying the winning image and name at the top of the page with height 50vh
      document.querySelector(".winnerDisplay").innerHTML = `
        <img src="winner.webp" alt="Winner" style="height: 50vh; width: auto;">
        <h2>${winnerName} Won!</h2>`;
      
      // game over sound
      gameOver.play();
    }
  });

  // Check for a draw
  if (isDraw) {
    for (let i = 0; i < boxtexts.length; i++) {
      if (boxtexts[i].innerText === "") {
        isDraw = false;
        break;
      }
    }
  }

  if (isDraw && !gameover) {
    gameover = true;
    document.querySelector(".info").innerText = "It's a Draw!";
    document.querySelector(".winnerDisplay").innerHTML = `
      <h2>It's a Draw!</h2>`;
    drawSound.play();

    // Play another game prompt
    setTimeout(() => {
      if (confirm("It's a draw! Do you want to play another game?")) {
        resetGame();
      }
    }, 1000);
  }
};

// Function to reset the game
const resetGame = () => {
  let boxTexts = document.querySelectorAll(".boxtext");
  Array.from(boxTexts).forEach((e) => {
    e.innerText = "";
  });
  turn = "x";
  gameover = false;
  document.querySelector(".info").innerText = "Turn for: " + playerX;
  document.querySelector(".line").style.width = "0"; // Hide the winning line

  // Clearing the winner display at the top of the page
  document.querySelector(".winnerDisplay").innerHTML = "";
};

// Game Logic:
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", (e) => {
    if (boxText.innerText === "" && !gameover) {
      boxText.innerText = turn;
      checkWin();
      if (!gameover) {
        turn = changeTurn();
        audioTurn.play();
        // Update the display to show the next player's turn
        document.getElementsByClassName("info")[0].innerText =
          "Turn for: " + (turn === "x" ? playerX : playerO);
      }
    }
  });
});

// Adding onclick listener to reset button:
document.getElementById("reset").addEventListener("click", () => {
  resetGame();
});

// Setting initial display to show the first player's turn after getting names
document.querySelector(".info").innerText = "Turn for: " + playerX;
