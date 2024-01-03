const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const newGameBtn = document.getElementById("new-btn");
const winnerMessage = document.querySelector(".message");
const winnerMessageText = document.querySelector(".message-text");

let turnA = true; // PlayerA and PlayerB

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnA) {
      (box.innerText = "O"), (turnA = false);
    } else {
      box.innerText = "X";
      turnA = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let positionValue1 = boxes[pattern[0]].innerText;
    let positionValue2 = boxes[pattern[1]].innerText;
    let positionValue3 = boxes[pattern[2]].innerText;

    if (positionValue1 !== "" && positionValue2 !== "" && positionValue3 !== "") {
      if (positionValue1 === positionValue2 && positionValue2 === positionValue3) {
        console.log("winner", positionValue1);
        showWinner(positionValue1);
        return; // Exit the function if there's a winner
      }
    }
  }

  // Check for a draw
  if ([...boxes].every(box => box.innerText !== "")) {
    console.log("It's a draw!");
    showDraw();
  }
}

function disableBoxes (){
  for(let box of boxes){
    box.disabled = true;
  }
}
function enableBoxes (){
  for(let box of boxes){
    box.disabled = false;
    box.innerHTML = '';
  }
}

function showWinner(winner){
  winnerMessageText.innerHTML = `Congratulations, Winner is ${winner}`;
  winnerMessage.classList.remove('hide');
  disableBoxes();
}

function resetGame(){
  turnA = true;
  enableBoxes();
  winnerMessage.classList.add('hide');
}

function showDraw() {
  winnerMessageText.innerHTML = "It's a draw!";
  winnerMessage.classList.remove('hide');
  disableBoxes();
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);