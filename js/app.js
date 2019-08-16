'use strict';

//***CHANGING USER NAME ***
//change user name by clicking change name button, otherwise show as guest
var userName = 'guest'; //default user name
var userNameEl = document.getElementById('user-name'); //right top corner of the page
var userNameEl2 = document.getElementById('user-name2'); // #about <p>
var changeNameEl = document.getElementById('add-name'); //change name button

var changeUserName = function() {
  userName = prompt('Welcome to my page! What\'s your name?');
  if (userName === null || userName === '') {
    userName = 'guest';
  }
  userNameEl.textContent = 'Welcome ' + userName + '!';
  userNameEl.style.padding = '14px 16px';
  userNameEl2.textContent = userName;
  console.log('The username entered through the form: ' + userName);
};
changeNameEl.addEventListener('click', changeUserName);

//***GUESSING GAME***
var correctAnswersCount; //stores number of correct answers

//questions
var questions = [
  'I have a collection of 50 rare butterflies',
  'I used to have 8 cats',
  'I climbed Elbrus last year',
  'I spent 3 nights in Mojave Desert in Nevada because my car broke down',
  'I jumped with parachute',
  'Try to guess how many marshmallows I can fit in my mouth',
  'Try to guess any country I\'ve ever been to'
];

//answers
var marshmallowsRandom = Math.floor(Math.random() * 20) + 10; //assigns random value between 10 and 30
var correctAnswers = [
  'no',
  'yes',
  'no',
  'no',
  'yes',
  marshmallowsRandom,
  ['Belarus', 'France', 'Canada', 'Germany', 'Poland', 'Lithuania', 'Latvia', 'Ukraine', 'Russia', 'Netherlands', 'Belgium', 'Moldova', 'Romania', 'Bulgaria', 'USA']
];

//notification messages
var notificationMessage = [
  'I don\'t know anything about butterflies',
  'I used to be a volunteer and take care of stray animals, so there were times when we had a lot of them at our house',
  'I haven\'t done it just yet, but it\'s on my bucket list',
  'I actually never been to Mojave Desert', 'I did it, and it was really cool!',
  'Honestly, I\'ve never tried to count it, and the answer is just a random number (which by the way was ' + marshmallowsRandom + ' this time), but good guess anyways! :-)'
];

//create a that starts guessing game when play button is clicked
var playButtonEl = document.getElementById('play-game');
var scoreEl = document.getElementById('score');

//guessing game function
var guessingGame = function() {
  //if user name is not entered - prompt to enter it
  if (userName === 'guest') {
    userName = prompt('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not. Please use only YES or NO to answer the first 5 questions. But first, please tell me your name ');
    console.log('the username entered at the game start: ' + userName);
    while (userName === null || userName === '' || userName ==='guest') {
      userName = prompt('I really think you should tell me who you are :-)');
    }
    //change user name on the site
    userNameEl.textContent = 'Welcome ' + userName + '!';
    userNameEl.style.padding = '14px 16px';
    userNameEl2.textContent = userName;
  } else {
    alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not. Please use only YES or NO to answer the first 5 questions');
  }
  correctAnswersCount = 0;
  for (var i = 0; i < questions.length; i++) {
    var answer = prompt(questions[i]).toLowerCase();
    //for the first 5 questions allow only yes/y or no/n answers and convert y/n to yes/no
    if (i < questions.length-2){
      while (!(answer === 'yes' || answer === 'no' || answer === 'y' || answer === 'n')) {
        answer = prompt(' I\'m sorry, I didn\'t quite get your answer, please try again using only yes and no answers. ' + questions[i]).toLowerCase();
      }
      if (answer === 'y') {
        answer = 'yes';
      } else if (answer === 'n') {
        answer = 'no';
      }
    //for the 6th question allow only numeric answers and give 4 attempts to guess the number
    } else if (i === questions.length-2) {
      for (var k = 0; k < 3; k++) {
        while (isNaN(answer) || answer === null || answer === '') {
          answer = prompt('Please enter a number for the answer');
        }
        console.log('The random generated number of marshmallows is - ' + correctAnswers[i] + '. User answer is - ' + answer);
        //show different prompt messages depending on how close user input was to the generated random message
        if (answer < 10) {
          answer = prompt('Wow, ' + userName + ', you\'re really underestimating me! Try again, you have ' + (3-k) + ' attempts left');
        } else if (answer > 30) {
          answer = prompt('Wow, ' + userName + ', you\'re really overestimating me! Try again, you have ' + (3-k) + ' attempts left');
        } else if (answer < correctAnswers[i]) {
          answer = prompt('Pretty close, ' + userName + ', but try a bit higher, you have ' + (3-k) + ' attempts left');
        } else if (answer > correctAnswers[i]) {
          answer = prompt('Pretty close, ' + userName + ', but try a bit lower, you have ' + (3-k) + ' attempts left');
        }
      }
      //convert prompt string into number to be able to use '==='
      answer = parseInt(answer);
    //for the 7th question give user 6 attempts, compare every entry with visited countries array
    } else {
      var correctCountry;      
      for (var n = 0; n < 5; n++) {        
        while (!isNaN(answer) || answer === null || answer === '') {
          answer = prompt('Please make sure you\'re entering a country');
        }
        var matchesFound = 0;
        for (k = 0; k < correctAnswers[i].length; k++) {
          if (answer.toLowerCase() === correctAnswers[i][k].toLowerCase()) {
            matchesFound++;
            correctCountry = correctAnswers[i][k];
            break;
          }
        }
        //if user guessed the country - exit the loop
        if (matchesFound > 0) {
          alert('Yay ' + userName + ', you\'re absolutely right! I\'ve been to ' + correctCountry + ' indeed. Here\'s the list of countries I visited: ' + correctAnswers[i].join(', '));
          correctAnswersCount++;
          console.log('Question ' + (i + 1) + ': "' + questions[i] + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + questions.length);
          break;
        } else {
          console.log('List of countries I\'ve been to: ' + correctAnswers[i].join(', ') + '. User answer is - ' + answer);
          answer = prompt('No, I haven\'t been there yet, try again, you have ' + (5-n) + ' attempts left');
        }
      }
      //if after 6 attempts no country guessed - show alert with a list of countries
      if (matchesFound === 0) {
        alert('Ooops, you\'re out of attempts, don\'t worry, you\'ll be more lucky next time! By the way, here\'s the list of countries I visited: ' + correctAnswers[i].join(', '));
      }
    }
    //checking if answers are correct for question 1-6
    if (i < questions.length-1) {
      if (answer === correctAnswers[i]) {
        alert('Yay ' + userName + ', you\'re absolutely right! ' + notificationMessage[i]);
        correctAnswersCount++;
      } else {
        alert('Nope ' + userName + ', not really, ' + notificationMessage[i]);
      }
      console.log('Question ' + (i + 1) +': "' + questions[i] + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + questions.length);
    }
  }
  //notifying user about the game score
  if(correctAnswersCount > 5) {
    alert('Congratulations ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers. Seems that you know me pretty well!');
  } else if (correctAnswersCount > 3) {
    alert('Pretty close, ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers, you can try again to get ' + questions.length + '/' + questions.length + '!');
  } else {
    alert('You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers. Cheer up, ' + userName + '! I\'m sure you can get more next time! :-)');
  }
  playButtonEl.textContent = 'PLAY AGAIN';
  scoreEl.innerHTML = '<br> Your last result is: '+ correctAnswersCount + ' correct answers out of ' + questions.length + ' questions. Do you want to play again?  ';
};
playButtonEl.addEventListener('click', guessingGame);
