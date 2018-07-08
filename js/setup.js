'use strict';

var WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserNameInput = setup.querySelector('.setup-user-name');
var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

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

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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
  for (var i = 0; i < WIZARDS; i++) {
    fragment.appendChild(renderWizard());
  }

  return fragment;
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(createList());

removeHidden('.setup-similar');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onSetupUserNameInputFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onSetupUserNameInputBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupUserNameInput.addEventListener('focus', onSetupUserNameInputFocus);
  setupUserNameInput.addEventListener('blur', onSetupUserNameInputBlur);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onSetupWizardCoatClick = function () {
  setupWizardCoat.style.fill = coatColors[getRandomNumber(coatColors)];
  setup.querySelector('input[name="coat-color"]').value = setupWizardCoat.style.fill;
};

var onSetupWizardEyesClick = function () {
  setupWizardEyes.style.fill = eyesColors[getRandomNumber(eyesColors)];
  setup.querySelector('input[name="eyes-color"]').value = setupWizardEyes.style.fill;
};

var onSetupFireballClick = function () {
  var fireballColor = fireballColors[getRandomNumber(fireballColors)];
  setupFireball.style.backgroundColor = fireballColor;
  setupFireball.querySelector('input[name="fireball-color"]').value = fireballColor;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserNameInput.addEventListener('invalid', function () {
  if (setupUserNameInput.validity.tooShort) {
    setupUserNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserNameInput.validity.tooLong) {
    setupUserNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserNameInput.validity.valueMissing) {
    setupUserNameInput.setCustomValidity('Обязательное поле');
  } else {
    setupUserNameInput.setCustomValidity('');
  }
});

setupUserNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
setupFireball.addEventListener('click', onSetupFireballClick);
