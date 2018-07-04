'use strict';

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var removeHidden = function (querySelector) {
  document.querySelector(querySelector).classList.remove('hidden');
};

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  if (Math.random() > 0.5) {
    wizardElement.querySelector('.setup-similar-label').textContent = names[getRandomNumber(names)] + ' ' + lastNames[getRandomNumber(lastNames)];
  } else {
    wizardElement.querySelector('.setup-similar-label').textContent = lastNames[getRandomNumber(lastNames)] + ' ' + names[getRandomNumber(names)];
  }
  wizardElement.querySelector('.wizard-coat').style.fill = coatColors[getRandomNumber(coatColors)];
  wizardElement.querySelector('.wizard-eyes').style.fill = eyesColors[getRandomNumber(eyesColors)];

  return wizardElement;
};

var createList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard());
  }

  return fragment;
};

removeHidden('.setup');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(createList());

removeHidden('.setup-similar');
