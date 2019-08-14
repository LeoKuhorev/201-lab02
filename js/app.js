'use strict';

//declaring global variables
var answerStatus; //correct or incorrect answer
var correctAnswersCount; //stores number of correct answers
// var timer; //timer for the guessing game

//array with questions
var questions = ['I spent 5 years studying tribology', 'My parked car was almost destroyed by an old lady a few weeks ago', 'I have a collection of 50 rare butterflies', 'I used to have 8 cats', 'I climbed Elbrus last year', 'I spent 3 nights in Mojave Desert in Nevada because my car broke down', 'I jumped with parachute', 'I hate dust so I vacuum every day no matter what'];

//array with answers
var correctAnswers = ['yes', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'no'];

// create a function that allows only yes or no answers and replaces y/n with yes/no
var userInput = function (question) {
  var answer = prompt(question);
  while (!(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'no' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'n')) {
    console.log('Unacceptable user entry - "' + answer + '", user prompted to try again');
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
var scoreEl = document.getElementById('score');

//guessing game function
var guessingGame = function () {
  // timer = 0;
  // console.log('entering function timer = ' + timer);
  // timer = window.setInterval(function(){timer++;console.log('inside setInterval function timer = ' + timer);}, 1000); //something is wrong here - return value of 26
  alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me, try to guess whether they are true or not. Please use only YES or NO to answer the questions');
  correctAnswersCount = 0;
  for (var i = 0; i < questions.length; i++) {
    var question = userInput(questions[i]);
    answerVerification(question, correctAnswers[i]);
    console.log('Question ' + (i + 1) +': "' + questions[i] + '". User answer: ' + question + ' - ' + answerStatus + '. Correct answers: '+ correctAnswersCount + ' out of ' + questions.length);
    // console.log('inside for loop timer = ' + timer);
  }
  //notifying user about the game score
  if(correctAnswersCount > 5) {
    alert('Congratulations ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers');
  } else if (correctAnswersCount > 3) {
    alert('Pretty close, ' + userName + '! You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers, try again');
  } else {
    alert('You\'ve got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers. Cheer up, ' + userName + '! I\'m sure you can get more next time! :-)');
  }
  playButtonEl.textContent = 'PLAY AGAIN';
  scoreEl.innerHTML = '<br> Your last result is: '+ correctAnswersCount + ' correct answers out of ' + questions.length + ' questions. Do you want to play again?  ';
  // console.log('exiting function timer = ' + timer);
  // window.clearInterval(timer);
};
playButtonEl.addEventListener('click', guessingGame);
