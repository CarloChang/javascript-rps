let selectedValue = "";
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let maximumRounds = 5;
const output = document.querySelector('.results');

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection) {  
    if (currentRound < maximumRounds) { 
        selectedValue = playerSelection;
        const computerChoice = getComputerChoice();

        if (selectedValue === computerChoice) { //tie
            output.innerHTML = '<p class = "mt-5">Player selected: ' + selectedValue +'</p><p>Computer selected: ' + computerChoice + '</p><b>The round ended in a tie</b><br><h4>The current score is:<br>Player: '+playerScore+' Computer: ' + computerScore;
            currentRound++;
        } else if ( //player wins
            (selectedValue == "Rock" && computerChoice == "Scissors") ||
            (selectedValue == "Scissors" && computerChoice == "Paper") ||
            (selectedValue == "Paper" && computerChoice == "Rock")
        ) {
            playerScore++;
            output.innerHTML = '<p class = "mt-5">Player selected: ' + selectedValue +'</p><p>Computer selected: ' + computerChoice + '</p><b>The player won this round</b><br><h4>The current score is:<br>Player: '+playerScore+' Computer: ' + computerScore;;
            currentRound++;
        } else if (//computer wins
            (selectedValue == "Scissors" && computerChoice == "Rock") ||
            (selectedValue == "Paper" && computerChoice == "Scissors") ||
            (selectedValue == "Rock" && computerChoice == "Paper")
        ) {
            computerScore++;
            output.innerHTML = '<p class = "mt-5">Player selected: ' + selectedValue +'</p><p>Computer selected: ' + computerChoice + '</p><b>The computer won this round</b><br><h4>The current score is:<br>Player: '+playerScore+' Computer: ' + computerScore;;
            currentRound++;
        }
    }
    

    if (currentRound === maximumRounds && (playerScore > computerScore || playerScore < computerScore || playerScore === computerScore)) {
        //Text display + play again button
        const winnerTextExists = output.querySelector(".winner-text");

        if (!winnerTextExists) {
            if (playerScore > computerScore) {
                const winnerTextPlayer = document.createElement('p');
                winnerTextPlayer.classList.add('mt-5', 'display-5', "winner-text", "fw-bold", "text-primary");
                winnerTextPlayer.textContent = "Player has won the 5 round game!";
                output.appendChild(winnerTextPlayer);
                output.appendChild(resetButton);
            } 

            else if (playerScore < computerScore){
                const winnerTextComputer = document.createElement('p');
                winnerTextComputer.classList.add('mt-5', 'display-5', "winner-text", "fw-bold", "text-danger");
                winnerTextComputer.textContent = "Computer has won the 5 round game!";
                output.appendChild(winnerTextComputer);
                output.appendChild(resetButton);
            } 

            else {
                const tieText = document.createElement('p');
                tieText.classList.add('mt-5', 'display-5', "winner-text", "fw-bold", "text-warning");
                tieText.textContent = "It's a tie! There's no winner :(";
                output.appendChild(tieText);
                output.appendChild(resetButton);
            }
        }

        // Remove event listeners to prevent further rounds
        document.querySelector('#Rock').removeEventListener('click', playRound);
        document.querySelector('#Paper').removeEventListener('click', playRound);
        document.querySelector('#Scissors').removeEventListener('click', playRound);
        return;
    }
}

let eventListenersAdded = false;

function deleteRound() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    output.classList.remove('winner-text');

    if(!eventListenersAdded) {
        document.querySelector('#Rock').removeEventListener('click', () => playRound('Rock'));
        document.querySelector('#Paper').removeEventListener('click', () => playRound('Paper'));
        document.querySelector('#Scissors').removeEventListener('click', () => playRound('Scissors'));
        eventListenersAdded = true;
    }

    const deleteButton = document.querySelector(".btn")
    output.removeChild(deleteButton);

    const deleteWinnerText = document.querySelector(".winner-text");
    output.removeChild(deleteWinnerText);
    
    output.innerHTML = '';
}


const resetButton = document.createElement('button');
resetButton.classList.add('btn', 'btn-danger');
resetButton.textContent = 'Play again';
resetButton.addEventListener('click', () => deleteRound())

const rockButton = document.querySelector('#Rock');
const paperButton = document.querySelector('#Paper');
const scissorsButton = document.querySelector('#Scissors');

rockButton.addEventListener('click', () => playRound('Rock'));
paperButton.addEventListener('click', () => playRound('Paper'));
scissorsButton.addEventListener('click', () => playRound('Scissors'));
    


const choices = ["Rock", "Paper", "Scissors"];










