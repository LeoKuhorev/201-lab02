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

//user entry validator function
function entryValidator (question, correctAnswer, answer) {
  if (typeof correctAnswer === 'string'){
    while (!(answer === 'yes' || answer === 'no' || answer === 'y' || answer === 'n')) {
      answer = prompt(' I\'m sorry, I didn\'t quite get your answer, please try again using only yes and no answers.\n' + question).toLowerCase();
    }
    if (answer === 'y') {
      answer = 'yes';
    } else if (answer === 'n') {
      answer = 'no';
    }
  }
  return answer;
}


//questions
var marshmallowsRandom = Math.floor(Math.random() * 20) + 10;

var gameQuestions = [
  {
    question: 'I have a collection of 50 rare butterflies',
    answer: 'no',
    yesMessage: 'I don\'t know anything about butterflies',
    noMessage: 'I don\'t know anything about butterflies',
    type: 1,
  },
  {
    question: 'I used to have 8 cats',
    answer: 'yes',
    yesMessage: 'I used to have 8 cats',
    noMessage: 'I used to have 8 cats',
    type: 1,
  },
  {
    question: 'I climbed Elbrus last year',
    answer: 'no',
    yesMessage: 'I haven\'t done it just yet, but it\'s definitely on my bucket list',
    noMessage: 'I haven\'t done it just yet, but it\'s definitely on my bucket list',
    type: 1,
  },
  {
    question: 'I spent 3 nights in Mojave Desert in Nevada because my car broke down',
    answer: 'no',
    yesMessage: 'I actually never been to Mojave Desert',
    noMessage: 'I actually never been to Mojave Desert',
    type: 1,
  },
  {
    question: 'I jumped with parachute',
    answer: 'yes',
    yesMessage: 'I did it, and it was really cool!',
    noMessage: 'I did it, and it was really cool!',
    type: 1,
  },
  {
    question: 'Try to guess how many marshmallows I can fit in my mouth. (Hint: between 10 and 30)',
    answer: marshmallowsRandom,
    yesMessage: 'Actually, I\'ve never tried to count it, and the answer is just a random number (which by the way was ' + marshmallowsRandom + ' this time), but good guess anyways! :-)',
    noMessage: 'Actually, I\'ve never tried to count it, and the answer is just a random number (which by the way was ' + marshmallowsRandom + ' this time), but good guess anyways! :-)',
    type: 2,
  },
  {
    question: 'Try to guess any country I\'ve ever been to',
    answer: ['Czech Republic', 'Belarus', 'France', 'Canada', 'Germany', 'Poland', 'Lithuania', 'Latvia', 'Ukraine', 'Russia', 'Netherlands', 'Belgium', 'Moldova', 'Romania', 'Bulgaria', 'USA', 'Turkey'],
    yesMessage: 'Placeholder',
    noMessage: 'Placeholder',
    type: 3,
  }
];

//create a function that starts guessing game when play button is clicked
var playButtonEl = document.getElementById('play-game');
var scoreEl = document.getElementById('score');

//guessing game function
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
  var correctAnswersCount = 0;

  //iterate through the arrays of questions/answers in random order (thanks to https://www.kirupa.com/html5/shuffling_array_js.htm)
  for (var i = gameQuestions.length-1; i >=0; i--) {

    //store random number between 0 and current index
    var randomIndex = Math.floor(Math.random()*(i+1));

    //store random array value in a variable for each array
    var itemAtIndex = gameQuestions[randomIndex]; //for questions array

    //swapping values of current index element and random index element
    //random index array element gets current index element value
    gameQuestions[randomIndex] = gameQuestions[i];

    //current index array element gets random index element value
    gameQuestions[i] = itemAtIndex;

    //prompt questions from the array, bring them lo lowercase
    var answer = prompt(gameQuestions[i].question).toLowerCase();

    //if the answer is a string, allow user only yes/y or no/n answers and convert y/n to yes/no
    answer = entryValidator(gameQuestions[i].question, gameQuestions[i].answer, answer);

    //if the answer is a number, allow user only numeric entries and give 4 attempts to guess the number
    if (!isNaN(gameQuestions[i].answer)) {
      for (var k = 0; k < 3; k++) {
        while (isNaN(answer) || answer === null || answer === '') {
          answer = prompt('Please enter a number for the answer');
        }
        console.log('The random generated number of marshmallows is - ' + gameQuestions[i].answer + '. User answer is - ' + answer);

        //show different prompt messages depending on how close user input was to the generated random message
        if (answer < 10) {
          answer = prompt('Wow, ' + userName + ', you\'re really underestimating me! Try again, you have ' + (3-k) + ' attempts left');
        } else if (answer > 30) {
          answer = prompt('Wow, ' + userName + ', you\'re really overestimating me! Try again, you have ' + (3-k) + ' attempts left');
        } else if (answer < gameQuestions[i].answer) {
          answer = prompt('Pretty close, ' + userName + ', but try a bit higher, you have ' + (3-k) + ' attempts left');
        } else if (answer > gameQuestions[i].answer) {
          answer = prompt('Pretty close, ' + userName + ', but try a bit lower, you have ' + (3-k) + ' attempts left');
        } else {
          break;
        }
      }

      //convert user entry into number to be able to use '===' rather than '=='
      answer = parseInt(answer);

    //if the answer is an array allow user only text entries, match the entry with array elements, and give 6 attempts to guess the answer
    } else if (Array.isArray(gameQuestions[i].answer)) {
      var correctCountry;
      for (var n = 0; n < 5; n++) {
        while (!isNaN(answer) || answer === null || answer === '') {
          answer = prompt('Please make sure you\'re entering a country');
        }
        var matchesFound = 0;
        for (k = 0; k < gameQuestions[i].answer.length; k++) {
          if (answer.toLowerCase() === gameQuestions[i].answer[k].toLowerCase()) {
            matchesFound++;
            correctCountry = gameQuestions[i].answer[k];
            break;
          }
        }

        //if user entry matches any array element form the array - exit the loop and show alert with list of all array elements
        if (matchesFound > 0) {
          alert('Yay ' + userName + ', you\'re absolutely right! I\'ve been to ' + correctCountry + ' indeed. Here\'s the list of countries I visited: ' + gameQuestions[i].answer.join(', '));
          correctAnswersCount++;
          console.log('Question ' + (gameQuestions.length - i) + ': "' + gameQuestions[i].question + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + gameQuestions.length);
          break;
        } else {
          console.log('List of countries I\'ve been to: ' + gameQuestions[i].answer.join(', ') + '. User answer is - ' + answer);
          answer = prompt('No, I haven\'t been to ' + answer + ' yet, try again, you have ' + (5-n) + ' attempts left');
        }
      }

      //if after 6 attempts no matches found - show alert with a list of array elements user tried to guess
      if (matchesFound === 0) {
        alert('Ooops, you\'re out of attempts, don\'t worry, you\'ll be more lucky next time! By the way, here\'s the list of countries I visited: ' + gameQuestions[i].answer.join(', '));
      }
    }

    //checking if answers are correct for string and numeric types of answers
    if (!Array.isArray(gameQuestions[i].answer)) {
      if (answer === gameQuestions[i].answer) {
        alert('Yay ' + userName + ', you\'re absolutely right! ' + gameQuestions[i].yesMessage);
        correctAnswersCount++;
      } else {
        alert('Nope ' + userName + ', not really, ' + gameQuestions[i].noMessage);
      }
      console.log('Question ' + (gameQuestions.length - i) +': "' + gameQuestions[i].question + '". User answer: ' + answer + ' . Correct answers: '+ correctAnswersCount + ' out of ' + gameQuestions.length);
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
