'use strict';

var classStatus = prompt('Do you like how the class is going?');

while (!(classStatus.toLowerCase() === 'yes' || classStatus.toLowerCase() === 'no')) {
  classStatus = prompt('please enter just yes or no');
}

if (classStatus === 'yes') {
  alert('Sure thing! It is going super well');
} else {
  alert('I don\'t think you\'re right');
}
