'use strict';

//declaring global variables
var answerStatus; //correct or incorrect answer
var correctAnswersCount; //stores number of correct answers
var correctAnswer; //stores correct answer for each question

// create a function that will allow only yes or no answers and replace y/n with yes/no
var userInput = function (question) {
  var answer = prompt(question);
  while (!(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'no' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'n')) {
    answer = prompt('I\'m sorry, I didn\'t quite get your answer, can you please try again using only yes and no?  ' + question);
  }
  if(answer.toLowerCase() === 'y') {
    answer = 'yes';
  } else if (answer.toLowerCase() === 'n') {
    answer = 'no';
  }
  return answer.toLowerCase();
};

//create a function that compares user answer with correct answer
var answerVerification = function (question){
  if(question === correctAnswer) {
    alert('Yay! You\'re absolutely right!');
    answerStatus = 'correct answer';
    correctAnswersCount++;
  } else {
    alert('Oh, unfortunately you\'re not right, hope you\'ll be more lucky next time!');
    answerStatus = 'incorrect answer';
  }
};

//change user name by clicking change name button, otherwise show as guest
var userName = 'guest';
var userNameEl = document.getElementById('user-name'); //right top corner
var userNameEl2 = document.getElementById('user-name2'); // #about p
var changeNameEl = document.getElementById('add-name'); //change name button

var changeUserName = function () {
  userName = prompt('Welcome to my page! What\'s your name?');
  if (userName === null || userName === '') {
    userName = 'guest';
  }
  userNameEl.textContent = 'Welcome ' + userName + '!';
  userNameEl.style.padding = '14px 16px';
  userNameEl2.textContent = userName;
  console.log('the username is ' + userName);
};
changeNameEl.addEventListener('click', changeUserName);

//create a function that starts guessing game when play button is clicked
var playButtonEl = document.getElementById('play-game');

//guessing game function
var guessingGame = function () {
  alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not. Please use only YES or NO to answer the questions');
  //list of questions (8 in total) *** turn into array and loop when get a chance***
  correctAnswersCount = 0;
  var studiedTribology = userInput('I spent 5 years studying tribology');
  correctAnswer = 'yes';
  answerVerification(studiedTribology);
  console.log('Spent 5 years studying tribology? - user answer: ' + studiedTribology + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var crushedCar = userInput('My parked car was almost destroyed by an old lady a few weeks ago');
  correctAnswer = 'yes';
  answerVerification(crushedCar);
  console.log('Car got crushed? - user answer: ' + crushedCar + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var butterflyCollection = userInput('I have a collection of 50 rare butterflies');
  correctAnswer = 'no';
  answerVerification(butterflyCollection);
  console.log('Have rare butterfly collection? - user answer: ' + butterflyCollection + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var eightCats = userInput('I used to have 8 cats');
  correctAnswer = 'yes';
  answerVerification(eightCats);
  console.log('Used to have 8 cats? - user answer: ' + eightCats + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var climbedElbrus = userInput('I climbed Elbrus last year');
  correctAnswer = 'no';
  answerVerification(climbedElbrus);
  console.log('Climbed Elbrus? - user answer: ' + climbedElbrus + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var spentNightInDesert = userInput('I spent 3 nights in Mojave Desert in Nevada because my car broke down');
  correctAnswer = 'no';
  answerVerification(spentNightInDesert);
  console.log('Spent 3 nights in a Desert? - user answer: ' + spentNightInDesert + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var parachuteJump = userInput('I jumped with parachute');
  correctAnswer = 'yes';
  answerVerification(parachuteJump);
  console.log('Jumped with parachute? - user answer: ' + parachuteJump + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  var dailyVacuum = userInput('I hate dust so I vacuum every day no matter what');
  correctAnswer = 'no';
  answerVerification(dailyVacuum);
  console.log('Vacuum daily? - user answer: ' + dailyVacuum + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of 8');
  if(correctAnswersCount > 5) {
    alert('Congratulations ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of 8 correct answers');
  } else if (correctAnswersCount > 3) {
    alert('Pretty close, ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of 8 correct answers, try again');
  } else {
    alert('You\'ve got ' + correctAnswersCount + ' out of 8 correct answers. Cheer up, ' + userName + '! I\'m sure you can get more next time! :-)');
  }
};
playButtonEl.addEventListener('click', guessingGame);
