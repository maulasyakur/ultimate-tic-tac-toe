const subCells = document.querySelectorAll(".sub-cell");
const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-game")
const gameStateLabel = document.querySelector(".game-over-label");
let currentTurn = "X";
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
initializeGame();

function initializeGame(){
    subCells.forEach(element => {
        element.addEventListener("click", addSymbol);
    });
    restartButton.addEventListener("click", restartGame)
    gameStateLabel.textContent = currentTurn + "'s turn";
}

function addSymbol(){
    if (this.textContent != ""){
        return;
    }

    this.textContent = currentTurn;
    let gameOver = checkGameOver(this.parentElement.children, this);
    if (gameOver == true){
        return;
    }

    moveCell(this);
    if (currentTurn === "X"){
        currentTurn = "O";
    }
    else if (currentTurn === "O"){
        currentTurn = "X";
    }
    gameStateLabel.textContent = currentTurn + "'s turn";
}

function restartGame(){
    currentTurn = "X";
    gameStateLabel.textContent = currentTurn + "'s turn";
    subCells.forEach(element => {
        element.addEventListener("click", addSymbol);
        element.textContent = "";
        element.style.cursor = "pointer";
    });
    cells.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

function checkGameOver(cells, currentCell){
    for (let i = 0; i < winConditions.length; i++){
        let winCondition = winConditions[i];
        let counter = 0;
        for (let j = 0; j < winCondition.length; j++){
            let index = winCondition[j];
            if (cells[index].textContent != currentCell.textContent){
                break;
            }
            counter += 1;
        }
        if (counter == 3){
            gameStateLabel.textContent = currentTurn + " won the game!";
            subCells.forEach(element => {
                element.removeEventListener("click", addSymbol);
            });
            return true;
        }
    }
    return false;
}

function moveCell(subCell){
    let index = subCell.getAttribute("sub-cell-index");
    for (let i = 0; i < cells.length; i++){
        if (cells[index] != cells[i]){
            cells[i].style.backgroundColor = "#cfcfcf";
            let nonSelectableCells = cells[i].children;
            for (let j = 0; j < nonSelectableCells.length; j++){
                nonSelectableCells[j].removeEventListener("click", addSymbol);
                nonSelectableCells[j].style.cursor = "default";
            }
        }
        else{
            cells[i].style.backgroundColor = "white";
            let selectableCells = cells[i].children;
            for (let j = 0; j < selectableCells.length; j++){
                selectableCells[j].addEventListener("click", addSymbol);
                selectableCells[j].style.cursor = "pointer";
            }
        }
    }
}