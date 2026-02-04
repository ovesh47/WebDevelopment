    // JavaScript for Rock-Paper-Scissors Game
    const score = JSON.parse(localStorage.getItem('rpsScore')) || {wins: 0, losses: 0, ties: 0};
        updateScoreDisplay();
        let computerMove = '';
                    // Function to play the game
      function playGame (playerMove) {
      pickCompMove ();
      let Result = '';
      if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
        Result = 'You tied!';
        } else if (computerMove === 'Paper') {
        Result = 'You lost!';
        } else {
        Result = 'You won!';
        }
      }
      else  if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
        Result = 'You won!';
        } else if (computerMove === 'Paper') {
        Result = 'You tied!';
        } else {
        Result = 'You lost!';
        }
      }
      else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
        Result = 'You lost!';
        } else if (computerMove === 'Paper') {
        Result = 'You won!';
        } else {
        Result = 'You tied!';
        }
      }

      if (Result === 'You won!') {
        score.wins += 1;
      } else if (Result === 'You lost!') {
        score.losses += 1;
      } else {
        score.ties += 1;
      }

      localStorage.setItem('rpsScore', JSON.stringify(score));
      updateScoreDisplay();
      document.querySelector('.gameResults').innerText = Result;
      document.querySelector('.movesPicked').innerHTML = `You: <img class="iconl" src="Icons/${playerMove.toLowerCase()}.png" alt="${playerMove}"> vs Computer: <img class="iconl" src="Icons/${computerMove.toLowerCase()}.png" alt="${computerMove}">`;
    }
    function updateScoreDisplay() {
      document.querySelector('.scoreDisplay').innerText =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }
    function pickCompMove(){
      let randomNumber = Math.random();
      computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1 /  3){
       computerMove = 'Rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
       computerMove = 'Paper';
      } else {
     computerMove = 'Scissors';
    }
   }
   