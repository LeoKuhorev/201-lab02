'use strict';

// create a function that will allow only yes and no answers and replace y/n to yes/no
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

var userName = prompt('Welcome to my page! What\'s your name?');
console.log('the username is ' + userName);

alert('Welcome to the guessing game, ' + userName + '. In this game I\'ll tell you a few facts about me and you\'ll have to guess whether it\'s true or not. Please use only yes and no to answer the quesions');

//list of questions
var studiedTribology = userInput('I spent 5 years studying tribology');
console.log('Spent 5 years studying tribology? - user answer: ' + studiedTribology);
var crushedCar = userInput('My parked car was almost destroyed by an old lady a few weeks ago');
console.log('Car got crushed? - user answer: ' + crushedCar);
var butterflyCollection = userInput('I have a collection of 50 rare butterflies');
console.log('Have rare butterfly collection? - user answer: ' + butterflyCollection);
var eightCats = userInput('I used to have 8 cats');
console.log('Used to have 8 cats? - user answer: ' + eightCats);
var climbedElbrus = userInput('I climbed Elbrus last year');
console.log('Climbed Elbrus? - user answer: ' + climbedElbrus);
var spentNightInDesert = userInput('I spent 3 nights in Mojave Desert in Nevada because my car broke down');
console.log('Spent 3 nights in a Desert? - user answer: ' + spentNightInDesert);
var parachuteJump = userInput('I jumped with parachute');
console.log('Jumped with parachute? - user answer: ' + parachuteJump);
var dailyVacuum = userInput('I hate dust so I vacuum every day no matter what');
console.log('Vacuum daily? - user answer: ' + dailyVacuum);
