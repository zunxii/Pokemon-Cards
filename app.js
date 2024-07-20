let tiles = document.querySelectorAll(".tiles");
let resetBtn = document.querySelector(".reset");
let errorsElement = document.querySelector(".error");

resetBtn.addEventListener("click", reset);

let errors = 0;
let cardList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
let cardSet;
let board = [];
let firstTile = null;
let secondTile = null;
let canClick = true;

window.onload = function() {
    reset();
};

function reset() {
    errors = 0;
    updateErrors();
    shuffleCards();
    setTiles();
    setTimeout(hideTiles, 750);
    board = [];
    firstTile = null;
    secondTile = null;
    canClick = true;
}

function setTiles() {
    tiles.forEach((button, index) => {
        button.innerHTML = `<img width="70px" src="${cardSet[index]}.png" alt="">`;
        button.dataset.card = cardSet[index];
        button.dataset.index = index;
        button.addEventListener("click", handleTileClick);
    });
}

function hideTiles() {
    tiles.forEach((button) => {
        button.innerHTML = `<img width="70px" src="back.png" alt="">`;
    });
}

function shuffleCards() {
    cardSet = cardList.concat(cardList);
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]];
    }
}

function handleTileClick(event) {
    if (!canClick) return;
    const tile = event.target.closest(".tiles");
    if (!tile || tile === firstTile || tile.classList.contains("matched")) return;
    
    tile.innerHTML = `<img width="70px" src="${tile.dataset.card}.png" alt="">`;

    if (!firstTile) {
        firstTile = tile;
    } else if (!secondTile) {
        secondTile = tile;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstTile.dataset.card === secondTile.dataset.card) {
        firstTile.classList.add("matched");
        secondTile.classList.add("matched");
        firstTile = null;
        secondTile = null;
        if (document.querySelectorAll(".matched").length === tiles.length) {
            setTimeout(() => alert("You win!"), 500);
        }
    } else {
        canClick = false;
        setTimeout(() => {
            firstTile.innerHTML = `<img width="70px" src="back.png" alt="">`;
            secondTile.innerHTML = `<img width="70px" src="back.png" alt="">`;
            firstTile = null;
            secondTile = null;
            canClick = true;
            errors++;
            updateErrors();
        }, 1000);
    }
}

function updateErrors() {
    errorsElement.textContent = `Errors: ${errors}`;
}
