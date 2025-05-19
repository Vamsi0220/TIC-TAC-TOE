let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#Reset");
let newGameBtn=document.querySelector("#ngame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
const gamearea=document.querySelector(".main");
let turnO=true;
let count=0;
let scoreO = 0;
let scoreX = 0;
let scoreOEl = document.querySelector("#scoreO");
let scoreXEl = document.querySelector("#scoreX");
let playerO = "Player O";
let playerX = "Player X";
const startGameBtn = document.querySelector("#startGameBtn");
const nameInputSection = document.querySelector(".name-inputs");
document.querySelector("#nameO").innerText = playerO;
document.querySelector("#nameX").innerText = playerX;

const winPatterns=[
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGameBtn.addEventListener("click", () => {
    const playerOInput = document.querySelector("#playerO").value.trim();
    const playerXInput = document.querySelector("#playerX").value.trim();

    if (playerOInput) playerO = playerOInput;
    if (playerXInput) playerX = playerXInput;

     document.querySelector("#nameO").innerText = playerO;
    document.querySelector("#nameX").innerText = playerX;

    nameInputSection.classList.add("hide");
    gamearea.classList.remove("hide");

    resetGame();
});
const resetGame=()=>{
    turnO=true; 
    enableboxes(); 
    msgContainer.classList.add("hide");
    count=0;
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO)
        {
            box.innerText="O"
            box.style.color='red';
            turnO=false;
        }
        else
        {
            box.innerText="X"
            box.style.color='black';
            turnO=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();

        if(count===9 && isWinner!=true)
        {
            drawGame();
        }
    });
});
const drawGame=()=>{
    msg.innerText="Game was a draw";
    msgContainer.classList.remove("hide");
    disableboxes();
}
const disableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

// const enableboxes=()=>{
//     for(let box of boxes)
//     {
//         box.disabled=false;
//         box.innerText="";
//     }
// };
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");  // Remove highlight
    }
};


// const showWinner=(winner)=>{
//     msg.innerText=`Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide"); 
//     disableboxes();
// };
const showWinner = (winner) => {
    const winnerName = winner === "O" ? playerO : playerX;  
    msg.innerText = `🎉 Congratulations, ${winnerName} wins!`;  
    msgContainer.classList.remove("hide");
    disableboxes();

    // Update score
    if (winner === "O") {
        scoreO++;
        scoreOEl.innerText = scoreO;
    } else {
        scoreX++;
        scoreXEl.innerText = scoreX;
    }

    // Highlight winning boxes
    highlightWinningBoxes(winner);
};

const highlightWinningBoxes = (winnerSymbol) => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText === winnerSymbol &&
            boxes[b].innerText === winnerSymbol &&
            boxes[c].innerText === winnerSymbol
        ) {
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");
            break;
        }
    }
};

const checkWinner = ()=>{
    for(let pattern of winPatterns )
    {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!="")
        {
            if(pos1val==pos2val && pos2val==pos3val)
            {
                showWinner(pos1val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
