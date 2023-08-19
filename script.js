//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

function switchPlayer(){
  //switch to next player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer= activePlayer===0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Starting conditions
let score,currentScore,activePlayer,playing;
function init (){
  score=[0,0];
  currentScore = 0;
  activePlayer=0;
  playing = true;
  diceEl.classList.add("hidden")

  score0El.textContent=score[0];
  score1El.textContent=score[1];
  current0El.textContent=currentScore;
  current1El.textContent=currentScore;


  player0El.classList.remove("player--winner")
  player1El.classList.remove("player--winner")
  player0El.classList.add("player--active")
  player1El.classList.remove("player--active")
}
init();
//rolling dice functionality
btnRoll.addEventListener("click",function() {
  if (playing){
    const dice = Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if(dice!==1){
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;

    }
    else {
      //switch to next player
      switchPlayer();
    }

  }
})
btnHold.addEventListener("click",function(){
  if (playing){
    //1.Add current score to active player's score
    score[activePlayer]+= currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=
      score[activePlayer];
    //2.Check if player's score is >=100
    if(score[activePlayer]>=20){
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden")
      document.querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner")
      document.querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active")
      //Switch to the next player
  } else {
      switchPlayer();
    }
  }
})
btnNew.addEventListener("click",init)
