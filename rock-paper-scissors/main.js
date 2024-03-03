var classicMode = document.querySelector('.classic')
var hardMode = document.querySelector('.hard')
var rock = document.querySelector('#rock.fighter')
var paper = document.querySelector('#paper.fighter')
var scissors = document.querySelector('#scissors.fighter')
var lizard = document.querySelector('#lizard.fighter')
var alien = document.querySelector('#alien.fighter')
var classicFighters = document.querySelector('.classic-fighters')
var rules = document.querySelector('.rules')
var changeGame = document.querySelector('.change-game-mode')
var gameMode = document.querySelector('.game-mode-selection')
var hardFighters = document.querySelector('.hard-fighters')
var chooseYourFighter = document.querySelector('.directions')
var challenge = document.querySelector('.challenge')
var classicRock = document.querySelector('#rock-classic')
var classicPaper = document.querySelector('#paper-classic')
var classicScissors = document.querySelector('#scissors-classic')
var playerScore = document.querySelector('.player-score')
var computerScore = document.querySelector('.computer-score')
var fighters = document.querySelector('.all-fighters')



addEventListener('load', setHomeView)

changeGame.addEventListener('click', setHomeView)

classicMode.addEventListener('click', function(){
    setClassicView()
    classicGame()
})

hardMode.addEventListener('click', function(){
    setHardView()
    hardGame()
})

function setClassicView(){
    classicFighters.classList.remove('hidden')
    changeGame.classList.remove('hidden')
    rules.classList.add('hidden')
    classicMode.classList.add('hidden')
    hardMode.classList.add('hidden')
    gameMode.classList.add('hidden')
    challenge.classList.add('hidden')
    hardFighters.classList.add('hidden')
    chooseYourFighter.classList.remove('hidden')
}

function setHardView(){
    classicFighters.classList.add('hidden')
    changeGame.classList.remove('hidden')
    gameMode.classList.add('hidden')
    rules.classList.add('hidden')
    challenge.classList.add('hidden')
    classicMode.classList.add('hidden')
    hardMode.classList.add('hidden')
    hardFighters.classList.remove('hidden')
    chooseYourFighter.classList.remove('hidden')
}

function setHomeView(){
    classicFighters.classList.add('hidden')
    hardFighters.classList.add('hidden')
    changeGame.classList.add('hidden')
    classicMode.classList.remove('hidden')
    hardMode.classList.remove('hidden')
    gameMode.classList.remove('hidden')
    rules.classList.remove('hidden')
    chooseYourFighter.classList.add('hidden')
}

function createPlayer(playerName, token, wins) {
    return {
        player: playerName,
        token: token,
        wins: wins || 0 
    };
}

var player1 = createPlayer('person', '🤠')
var computer = createPlayer('computer', '🤖')

function createGame(player1, computer, mode){
    game = {
        player1: player1,
        computer: computer,
        gameType: mode,
        totalGames: 0
    }
    return game
}

function computerChoiceClassic(){
    var choices = ['rock', 'paper', 'scissors']
    var computerChoice = Math.floor(Math.random() * choices.length)
    return choices[computerChoice]
}

function computerChoiceHard(){
    var choices = ['rock', 'paper', 'scissors', 'alien', 'lizard']
    var computerChoice = Math.floor(Math.random() * choices.length)
    return choices[computerChoice]
}

function classicGame() {
    classicRock.addEventListener('click', function() {
        handlePlayerChoice('rock');
    })
    classicPaper.addEventListener('click', function() {
        handlePlayerChoice('paper');
    })
    classicScissors.addEventListener('click', function() {
        handlePlayerChoice('scissors');
    })
    function handlePlayerChoice(choice) {
        var computerChoice = computerChoiceClassic();
        var winner = determineWinner(choice, computerChoice);
        displayResult(winner);
    }
    function determineWinner(playerChoice, computerChoice) {
        if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')) {
            return 'player'
        } else if (playerChoice === computerChoice) {
            return 'draw'
        } else {
            return 'computer'
        }
    }
    function displayResult(winner) {
        if (winner === 'player') {
            chooseFighterText('You won!!!')
        } else if (winner === 'computer') {
            chooseFighterText("boooo! The robots winning :(")
        } else {
            chooseFighterText("Its a Draw!")
        }
        displayWins(player1, computer)
        setTimeout(() => {
            resetGame()
        }, 3000);
    }
}

function hardGame() {
    rock.addEventListener('click', function() {
        handlePlayerChoice('rock');
    })
    paper.addEventListener('click', function() {
        handlePlayerChoice('paper');
    })
    scissors.addEventListener('click', function() {
        handlePlayerChoice('scissors');
    })
    alien.addEventListener('click', function() {
        handlePlayerChoice('alien')
    })
    lizard.addEventListener('click', function(){
        handlePlayerChoice('lizard')
    })
    function handlePlayerChoice(choice) {
        var computerChoice = computerChoiceHard();
        var winner = determineWinner(choice, computerChoice);
        displayResult(winner);
    }
    function determineWinner(playerChoice, computerChoice) {
        var extendedWinningCombos = {
            'rock': ['scissors', 'lizard'],
            'paper': ['rock', 'alien'],
            'scissors': ['paper', 'lizard'],
            'lizard': ['paper', 'alien'],
            'alien': ['scissors', 'rock']
        };
        if (playerChoice === computerChoice) {
            return 'draw'
        } else if (extendedWinningCombos[playerChoice].includes(computerChoice)) {
            return 'player'
        } else {
            return 'computer'
        }
    }
    function displayResult(winner) {
        if (winner === 'player') {
            chooseFighterText('You won!!!')
        } else if (winner === 'computer') {
            chooseFighterText("boooo! The robots winning :(")
        } else {
            chooseFighterText("Its a Draw!")
        }
        displayWins(player1, computer)
        setTimeout(() => {
            resetGame()
        }, 3000);
    }
} 

function displayWins(player1, computer){
    playerScore.innerText = `${player1.wins} wins!`
    computerScore.innerText = `${computer.wins} wins!`
}

function addPoints(winner){
    if (winner === 'player') {
        player1.wins++
    } else if (winner === 'computer') {
        computer.wins++
    } 
}


function chooseFighterText(text){
    chooseYourFighter.innerText = text
}

function resetGame(){
    chooseFighterText('Choose your fighter!')
}

