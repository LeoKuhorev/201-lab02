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

//GETTING DOM ELEMENTS:
var playButtonEl = document.getElementById('play-game'); //play button
var scoreEl = document.getElementById('score'); //showing score when the game is over
var randomEl = document.getElementById('random'); //random order checkbox

var correctAnswersCount;

//FUNCTIONS:
//ARRAY SHUFFLE FUNCTION: (thanks to https://www.kirupa.com/html5/shuffling_array_js.htm)
Array.prototype.shuffle = function () {
  var inputArray = this;
  for (var i = inputArray.length-1; i >=0; i--) {
    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = inputArray[randomIndex];
    inputArray[randomIndex] = inputArray[i];
    inputArray[i] = itemAtIndex;
  }
  return inputArray;
};

// USER ENRY VALIDATOR FUNCTION:
function entryValidator (object, answer) {
  var question = object.question;
  var correctAnswer = object.answer;

  // if correct answer = string - allow only yes/no answers and replace y/n with yes/no;
  if (typeof correctAnswer === 'string'){
    while (!(answer === 'yes' || answer === 'no' || answer === 'y' || answer === 'n')
    || answer === null
    || answer === '') {
      answer = prompt('I\'m sorry, I didn\'t quite get it, please try again using only YES and NO for the answer.\n' + question).toLowerCase();
    }
    if (answer === 'y') {
      answer = 'yes';
    } else if (answer === 'n') {
      answer = 'no';
    }
  // if correct answer = number - allow only numeric answers, parseInt result;
  } else if (!isNaN(correctAnswer)) {
    while (isNaN(answer) || answer === null || answer === '') {
      answer = parseInt(prompt('I\'m sorry, I didn\'t quite get it, please try again using only NUMBERS for the answer.\n' + question));
    }
  // if correct answer = array - allow only text answers, bring the answer to lowercase
  } else if (Array.isArray(correctAnswer)) {
    while (!isNaN(answer) || answer === null || answer === '') {
      answer = prompt('I\'m sorry, I didn\'t quite get it, please try again using only a VALID WORD for the answer.\n' + question).toLowerCase();
    }
  }
  return answer;
}

//QUESTIONS AND ANSWERS FOR THE GAME:
var marshmallowsRandom = Math.floor(Math.random() * 20) + 10; //random value 10..30
var gameQuestions = [
  {
    question: 'I have a collection of 50 rare butterflies',
    answer: 'no',
    yesMessage: 'you\'re absolutely right, I don\'t. Honestly, I don\'t know anything about butterflies',
    noMessage: 'I don\'t, Honestly, I don\'t know anything about butterflies at all',
    attempts: 1,
  },
  {
    question: 'I used to have 8 cats',
    answer: 'yes',
    yesMessage: 'you\'re absolutely right, I used to be a volunteer and take care of stray animals, so there were times when we had a lot of them at our house',
    noMessage: 'you\'re not right, I used to be a volunteer and take care of stray animals, so there were times when we had a lot of them at our house',
    attempts: 1,
  },
  {
    question: 'I climbed Elbrus last year',
    answer: 'no',
    yesMessage: 'you\'re right, I haven\'t done it just yet, but it\'s definitely on my bucket list',
    noMessage: 'I wish I could say that you\'re right, but I haven\'t done it just yet, it\'s definitely on my bucket list, though',
    attempts: 1,
  },
  {
    question: 'I spent 3 nights in Mojave Desert in Nevada because my car broke down',
    answer: 'no',
    yesMessage: 'you\'re absolutely right, I totally made it up. Actually I\'ve never been to Mojave Desert',
    noMessage: 'this is not correct, I totally made it up. Actually I\'ve never been to Mojave Desert',
    attempts: 1,
  },
  {
    question: 'I jumped with parachute',
    answer: 'yes',
    yesMessage: 'you\'re right, I did it, and it was really cool!',
    noMessage: 'you\'re not right, I actually did it, and it was really cool!',
    attempts: 1,
  },
  {
    question: 'Try to guess how many marshmallows I can fit in my mouth. (Hint: between 10 and 30)',
    answer: marshmallowsRandom,
    yesMessage: 'you git it! Actually, I\'ve never tried to count it, and the answer is just a random number (which by the way was ' + marshmallowsRandom + ' this time), but good guess anyways! :-)',
    noMessage: 'you\'re out of attempts. Actually, I\'ve never tried to count it, and the answer is just a random number (which by the way was ' + marshmallowsRandom + ' this time), but good guess anyways! :-)',
    attempts: 4,
  },
  {
    question: 'Try to guess any country I\'ve ever been to',
    answer: ['Czech Republic', 'Belarus', 'France', 'Canada', 'Germany', 'Poland', 'Lithuania', 'Latvia', 'Ukraine', 'Russia', 'Netherlands', 'Belgium', 'Moldova', 'Romania', 'Bulgaria', 'USA', 'Turkey'],
    yesMessage: 'Placeholder',
    noMessage: 'Placeholder',
    attempts: 6,
  }
];


//GUESSING GAME FUNCTION:
var guessingGame = function() {

  //if user name is not entered before - prompt to enter it
  if (userName === 'guest') {
    userName = prompt('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not. But first, please tell me your name ');
    console.log('the username entered at the game start: ' + userName);
    while (userName === null || userName === '' || userName ==='guest') {
      userName = prompt('I really think you should tell me who you are :-)');
    }

    //change user name in the site html and remove change name button
    userNameEl.textContent = 'Welcome ' + userName + '!';
    userNameEl.style.padding = '14px 16px';
    userNameEl2.textContent = userName;

  //if name is entered before - just start the game
  } else {
    alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not.');
  }

  //always start the game with 0 correct answers
  correctAnswersCount = 0;

  //if 'random order' checkbox checked - shuffle questions array
  if (randomEl.checked){
    gameQuestions.shuffle();
  }

  //iterate through the list of questions
  for (var i = 0; i < gameQuestions.length; i++) {

    var answer = prompt(gameQuestions[i].question).toLowerCase();

    //give user specified number of attempts to answer the question
    var attempt = 1;
    do {
      answer = entryValidator(gameQuestions[i], answer); //check user answer with entryValidator function

      //if the answer is a number
      if (!isNaN(gameQuestions[i].answer)) {
        console.log('The number is - ' + gameQuestions[i].answer + '. User answer is - ' + answer);

        //show different prompt messages depending on how close user input was to the generated random message
        if (answer < 0.5 * gameQuestions[i].answer) {
          answer = parseInt(prompt('Wow, ' + userName + ', this is way too low! Try again, you have ' + (gameQuestions[i].attempts-attempt) + ' attempts left'));
        } else if (answer > 2 * gameQuestions[i].answer) {
          answer = parseInt(prompt('Wow, ' + userName + ', this is way too high! Try again, you have ' + (gameQuestions[i].attempts-attempt) + ' attempts left'));
        } else if (answer < gameQuestions[i].answer) {
          answer = parseInt(prompt('Pretty close, ' + userName + ', but try a bit higher, you have ' + (gameQuestions[i].attempts-attempt) + ' attempts left'));
        } else if (answer > gameQuestions[i].answer) {
          answer = parseInt(prompt('Pretty close, ' + userName + ', but try a bit lower, you have ' + (gameQuestions[i].attempts-attempt) + ' attempts left'));
        } else {
          break;
        }

      //if the answer is an array check if user answer matches any array element
      } else if (Array.isArray(gameQuestions[i].answer)) {
        var correctCountry;
        var matchesFound = 0;
        for (var n = 0; n < gameQuestions[i].answer.length; n++) {
          if (answer === gameQuestions[i].answer[n].toLowerCase()) {
            matchesFound++;
            correctCountry = gameQuestions[i].answer[n];
            break;
          }
        }

        //if user entry matches any array element - exit the loop and show alert with list of all array elements
        if (matchesFound > 0) {
          alert('Yay ' + userName + ', you\'re absolutely right! I\'ve been to ' + correctCountry + ' indeed. Here\'s the list of countries I visited: ' + gameQuestions[i].answer.join(', '));
          correctAnswersCount++;
          console.log('Question ' + (i+1) + ': "' + gameQuestions[i].question + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + gameQuestions.length);
          break;
        } else {
          console.log('List of countries I\'ve been to: ' + gameQuestions[i].answer.join(', ') + '. User answer is - ' + answer);
          answer = prompt('No, I haven\'t been to ' + answer + ' yet, try again, you have ' + (gameQuestions[i].attempts-attempt) + ' attempts left');
        }
      }
      attempt++;
    }
    while (attempt < gameQuestions[i].attempts);

    if (Array.isArray(gameQuestions[i].answer)) {
      //if after 6 attempts no matches found - show alert with a list of array elements user tried to guess
      if (matchesFound === 0) {
        alert('Ooops, you\'re out of attempts, don\'t worry, you\'ll be more lucky next time! By the way, here\'s the list of countries I visited: ' + gameQuestions[i].answer.join(', '));
      }
    }
    //checking if answers are correct for string and numeric types of answers
    if (!Array.isArray(gameQuestions[i].answer)) {
      if (answer === gameQuestions[i].answer) {
        alert('Yay ' + userName + ', ' + gameQuestions[i].yesMessage);
      correctAnswersCount++;
    } else {
      alert('Nope ' + userName + ', ' + gameQuestions[i].noMessage);
    }
      console.log('Question ' + (i+1) +': "' + gameQuestions[i].question + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + gameQuestions.length);
    }

  }
  //notifying user about the game score
  if(correctAnswersCount > 0.8*gameQuestions.length) {
    alert('Congratulations ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + gameQuestions.length + ' correct answers. Seems that you know me pretty well!');
  } else if (correctAnswersCount > 0.5*gameQuestions.length) {
    alert('Pretty close, ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + gameQuestions.length + ' correct answers, you can try again to get ' + gameQuestions.length + '/' + gameQuestions.length + '!');
  } else {
    alert('You\'ve got ' + correctAnswersCount + ' out of ' + gameQuestions.length + ' correct answers. Cheer up, ' + userName + '! I\'m sure you can get more next time! :-)');
  }
  playButtonEl.textContent = 'PLAY AGAIN';
  scoreEl.innerHTML = '<br> Your last result is: '+ correctAnswersCount + ' correct answers out of ' + gameQuestions.length + ' questions. Do you want to play again?  ';
};
playButtonEl.addEventListener('click', guessingGame);
