const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const restartBtn = document.getElementById("restartBtn");

const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍑"];

let cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard(){
    board.innerHTML = "";
    shuffle(cards);

    cards.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="front">?</div>
                <div class="back">${emoji}</div>
            </div>
        `;

        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);

        board.appendChild(card);
    });
}

function flipCard(){

    if(lockBoard) return;
    if(this === firstCard) return;
    if(this.classList.contains("matched")) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch(){

    const isMatch =
        firstCard.dataset.emoji === secondCard.dataset.emoji;

    if(isMatch){
        disableCards();
    }else{
        unflipCards();
    }
}

function disableCards(){

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;

    resetBoard();

    if(matchedPairs === emojis.length){
        setTimeout(()=>{
            alert(`🎉 You Won in ${moves} moves!`);
        },300);
    }
}

function unflipCards(){

    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    },1000);
}

function resetBoard(){
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame(){

    moves = 0;
    matchedPairs = 0;

    movesDisplay.textContent = moves;

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    createBoard();
}

restartBtn.addEventListener("click", restartGame);

createBoard();