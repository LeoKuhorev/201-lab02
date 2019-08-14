'use strict';

//declaring global variables
var answerStatus; //correct or incorrect answer
var correctAnswersCount; //stores number of correct answers

//array with questions
var questions = ['I spent 5 years studying tribology', 'My parked car was almost destroyed by an old lady a few weeks ago', 'I have a collection of 50 rare butterflies', 'I used to have 8 cats', 'I climbed Elbrus last year', 'I spent 3 nights in Mojave Desert in Nevada because my car broke down', 'I jumped with parachute', 'I hate dust so I vacuum every day no matter what'];

//array with answers
var correctAnswers = ['yes', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'no'];

// create a function that allows only yes or no answers and replace y/n with yes/no
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
var answerVerification = function (question, answer){
  if(question === answer) {
    alert('Yay! You\'re absolutely right!');
    answerStatus = 'correct answer';
    correctAnswersCount++;
  } else {
    alert('Oh, unfortunately you\'re not right, hope you\'ll be more lucky next time!');
    answerStatus = 'incorrect answer';
  }
};

//change user name by clicking change name button, otherwise show as guest
var userName = 'guest'; //default user name
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
  correctAnswersCount = 0;
  for (var i=0; i<questions.length; i++) {
    var question = userInput(questions[i]);
    answerVerification(question, correctAnswers[i]);
    console.log('Question ' +(i+1) +': "' + questions[i] + '". User answer: ' + question + ' - ' +answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of ' + questions.length);
  }
  //notifying user about the game score
  if(correctAnswersCount > 5) {
    alert('Congratulations ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers');
  } else if (correctAnswersCount > 3) {
    alert('Pretty close, ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers, try again');
  } else {
    alert('You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers. Cheer up, ' + userName + '! I\'m sure you can get more next time! :-)');
  }
};
playButtonEl.addEventListener('click', guessingGame);
