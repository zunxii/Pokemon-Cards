let tiles = document.querySelectorAll(".tiles")
let resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", reset)

let errors = 0;
let cardList = [
    "a","b","c","d","e","f","g","h","i","j"
]

let cardSet;

let board = [];

window.onload = function() {
    reset()

    // startGame();
}
function reset(){
    shuffleCards()
    setTiles()
    setTimeout(hideTiles,750)

}
function setTiles(){
    tiles.forEach((button, index) => {
        button.innerHTML = `<img width="70px" src="${cardSet[index]}.png" alt="">`;
      });
}

function hideTiles(){
    tiles.forEach((button, index) => {
        button.innerHTML = `<img width="70px" src="back.png" alt="">`;
      });
}
function shuffleCards(){
    cardSet = cardList.concat(cardList);
    for(let i = 0; i<cardSet.length;i++){
        let j = Math.floor(Math.random()*cardSet.length);
        [cardSet[i],cardSet[j]] = [cardSet[j],cardSet[i]];
        }
}