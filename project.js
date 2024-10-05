let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#Reset");
let newGameBtn=document.querySelector("#ngame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;
let count=0;

const winPatterns=[
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 6, 8],
    [0, 4, 8],
    [2, 4, 6]
]

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

const enableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); 
    disableboxes();
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