//Rules of the game
//Player one roles the dice and the score gets added to their current total
//If the player wants to hold and add to their overall score they can click the hold score button and the score will be added to the overall score and p2 will now be the active player
//Player 2 follows the same process
//If a player roles a one their current score goes back to 0 and the other player becomes active
//Players can select the score they wish to play to

//Select UI elements
const rollDice = document.querySelector(".roll-dice");
const holdScore = document.querySelector(".hold-score");
const newGame = document.querySelector(".new-game");
const playTo = document.querySelector(".play-to");
const p1Overall = document.querySelector(".overall-p0");
const p2Overall = document.querySelector(".overall-p1");
const p1Current = document.querySelector(".current-score-p0");
const p2Current = document.querySelector(".current-score-p1");
const p1Container = document.querySelector(".container-p0");
const p2Container = document.querySelector(".container-p1");
let dice = document.querySelector(".dice");

//Set initial game variables
let currentPlayer = 0;
let currentScore = [0, 0];
let overallScore = [0, 0];
let winningScore;
let p1ScoreOverall = 0;
let p2ScoreOverall = 0;
let p1ScoreCurrent = 0;
let p2ScoreCurrent = 0;
let roll;
let gameover = false;

//Hide dice to start
dice.style.display = "none";

//Function for dice roll
diceRoll = () => {
    //Generate diceroll number
    roll = Math.floor(Math.random() * 6) + 1;

    //Display correct dice onscrean
    dice.src = `img/dice-${roll}.png`;
    dice.style.display = "block";
};

//Create event listeners

//Event listener for roll dice
rollDice.addEventListener("click", () => {
    //Check if gameover
    if(!gameover) {
        //Role dice
        diceRoll();

    //Check current player
    if(currentPlayer === 0) {
        //If a one is rolled reset current score to 0 and switch to next player
        if(roll === 1) {
            //Reset players current score
            currentScore[currentPlayer] = 0;
            //Set current score display back to 0
            p1Current.textContent = currentScore[currentPlayer];
            //Set current player to player 2
            currentPlayer = 1;
            //Remove active class from player one and set to player two
            p1Container.classList.toggle("active");
            p2Container.classList.toggle("active");
        } else {
            //For any other number rolled add to the players current score
            currentScore[currentPlayer] += roll;
            //Display current score on screen
            p1Current.textContent = currentScore[currentPlayer];

    }

    } else {
        //If a one is rolled reset current score to 0 and switch to next player
        if(roll === 1) {
            //Reset players current score
            currentScore[currentPlayer] = 0;
            //Set current score display back to 0
            p2Current.textContent = currentScore[currentPlayer];
            //Set current player to player 1
            currentPlayer = 0;
            //Remove active class from player two and set to player one
            p1Container.classList.toggle("active");
            p2Container.classList.toggle("active");
        } else {
            //For any other number rolled add to the players current score
            currentScore[currentPlayer] += roll;
            //Display current score on screen
            p2Current.textContent = currentScore[currentPlayer];
    }
    }
    }

});

//Event listener for hold score
holdScore.addEventListener("click", () => {
    //Set winning score
    winningScore = playTo.value;

    //Check if gameover
    if(!gameover) {
        //Check current player
        if(currentPlayer === 0) {
            //Add players current score to overall score
            overallScore[currentPlayer] += currentScore[currentPlayer];
            //Display players overall score on screen
            p1Overall.textContent = overallScore[currentPlayer];
            //Set current score to 0
            currentScore = [0, 0];
            //Set current score display to 0
            p1Current.textContent = currentScore[currentPlayer];

            //Check score meets winning criteria
            if(overallScore[currentPlayer] >= winningScore) {
                //If score meets winning criteria set gameover to true
                gameover = true;
                //keep current player
                currentPlayer = 0;
                //Add winner class to current player
                p1Container.classList.add("winner");
                //Change player text content
                document.querySelector(".p0").textContent = "WINNER!!!";
            } else {
                //If score does not meet criterea set current player to player 2
                currentPlayer = 1;
                //Remove active class from p1 and set to p2
                p1Container.classList.toggle("active");
                p2Container.classList.toggle("active");

        }
        
    } else {
        //if player 2 add current score to overall score
        overallScore[currentPlayer] += currentScore[currentPlayer];
        //Display players overall score on screen
        p2Overall.textContent = overallScore[currentPlayer];
        //Set current score to 0
        currentScore = [0, 0];
        //Set current score display to 0
        p2Current.textContent = currentScore[currentPlayer];

        //Check score meets winning criteria
        if(overallScore[currentPlayer] >= winningScore) {
            //If score meets winning criteria set gameover to true
            gameover = true;
            //Keep current player
            currentPlayer = 1;
            //Add winner class to current player
            p2Container.classList.add("winner");
            //Change player text content
            document.querySelector(".p1").textContent = "WINNER!!!";
        } else {
            //If score does not meet criteria set current player to player 1
            currentPlayer = 0;
            //Remove active class from p2 and set to p1
            p1Container.classList.toggle("active");
            p2Container.classList.toggle("active");

        }
    }

    }

});

//Event listener for new game
newGame.addEventListener("click", () => {
    //Set overall scores to 0
    overallScore = [0, 0];
    //Set current scores to 0
    currentScore = [0, 0];
    //Set overall and current scores to 0
    p1Overall.textContent = overallScore[currentPlayer];
    p2Overall.textContent = overallScore[currentPlayer];
    p1Current.textContent = overallScore[currentPlayer];
    p1Current.textContent = overallScore[currentPlayer];
    //Set current player to p1
    currentPlayer = 0;
    //Add active class to p1
    p1Container.classList.add("active");
    //remove active class from p2
    p2Container.classList.remove("active");
    //remove winner class from both players
    p1Container.classList.remove("winner");
    p2Container.classList.remove("winner");
    //Set player text back to default
    document.querySelector(".p0").textContent = "PLAYER 1";
    document.querySelector(".p1").textContent = "PLAYER 2";
    //Set dice display to none
    dice.style.display = "none";
    //Set gameover back to false
    gameover = false;
});