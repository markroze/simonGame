// Global Variables
var gState = {
    sequence:'',
    currturn: {
        isUserTurn: false,
        playedNotes: 0
    },
    gameOver: false
};
var gSounds = {
    a: new Audio('sounds/trump.mp3'),
    b: new Audio('sounds/trump1.mp3'),
    c: new Audio('sounds/trump2.mp3'),
    d: new Audio('sounds/trump3.mp3'),
    e: new Audio('sounds/trump4.mp3'),
    looser: new Audio('sounds/looser.mp3')
};
// This function randomly extends the amount of sounds to play
function extendSqn(sequence) {
    var letters = ['a','b','c','d','e'];
    var random = parseInt(Math.random()*5);
    sequence += letters[random];
    gState.sequence = sequence;
}

// This function initiates the computer turn and plays the sequence
function playSqn() {
    if (gState.currturn.isUserTurn) return;
    var counter  = 0;
    var   musicInterval = setInterval(function () {
        var currSound = gState.sequence[counter];
        document.getElementById('note-' + currSound + '').classList.add('activeNote');
        gSounds[currSound].play();
        counter++;
        if (counter === gState.sequence.length) {
            clearInterval(musicInterval);
            setTimeout(userTurn, 800);
            gState.currturn.playedNotes = 0;
        }
        setTimeout(clearActive, 500)
    }, 1000);
}
// function that lets the user to press the keys
function userTurn(){
    gState.currturn.isUserTurn = true;
}

// this function in-charge of the user click
function noteClicked(note) {
    var thisRound = gState.currturn;
    if (gState.gameOver)        return;
    if (!thisRound.isUserTurn)  return;

    if (note === gState.sequence[thisRound.playedNotes]) {
        gSounds[note].play();
        thisRound.playedNotes++;
    }else {
        gState.gameOver = true;
        gSounds.looser.play();
        document.querySelector('button').innerHTML = "Restart Game";
        document.querySelector('.gameover').classList.remove('hide');
    }
    if (thisRound.playedNotes === gState.sequence.length) {
        thisRound.isUserTurn = false;
        extendSqn(gState.sequence);
        playSqn(gState.sequence);
    }
}
// Starts the game and restarts it
function initGame() {
    document.querySelector('.gameover').classList.add('hide');
    gState.currturn.isUserTurn = false;
    gState.gameOver = false;
    gState.sequence = '';
    extendSqn(gState.sequence);
    playSqn(gState.sequence);
}
// clears the cell color change
function clearActive() {
    var activeCell = document.querySelector('.activeNote');
    activeCell.classList.remove('activeNote');

}