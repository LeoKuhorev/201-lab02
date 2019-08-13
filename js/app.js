'use strict';

//declaring variables
var answerStatus; //correct or incorrect answer
var correctAnswersCount; //stores number of correct answers
var correctAnswer; //stores correct answer for each question

// create a function that will allow only yes or no answers and replace y/n to yes/no
var userInput = function (question) {
  var answer = prompt(question);
  answer = answer.toLowerCase();
  while (!(answer === 'yes' || answer === 'no' || answer === 'y' || answer === 'n')) {
    answer = prompt('I\'m sorry, I didn\'t quite get your answer, can you please try again using only yes and no?');
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

//ask user to enter their name, if name is not entered call them 'guest'
var userName = prompt('Welcome to my page! What\'s your name?');
if (userName === null || userName === '') {
  userName = 'guest';
}
console.log('the username is ' + userName);

//create a function that starts guessing game when play button is clicked
var playButtonEl = document.getElementById('play-game');

var guessingGame = function () {
  //guessing game
  alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me and you\'ll have to guess whether it\'s true or not. Please use only yes and no to answer the quesions');
  //list of questions (8 in total)
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
  answerVerification(crushedCar);
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
    alert('You\'ve got ' + correctAnswersCount + ' out of 8 correct answers, cheer up, ' + userName + ', I\'m sure you can get more next time!');
  }
};
playButtonEl.addEventListener('click', guessingGame);
