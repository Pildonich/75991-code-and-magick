'use strict';

// Покажите блок .setup, убрав в JS-коде у него класс .hidden.

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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

// функция генерации случайного числа (данных)

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// функция создания объекта

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  if (Math.random() > 0.5) {
    wizardElement.querySelector('.setup-similar-label').textContent = names[getRandomNumber(names)] + ' ' + lastNames[getRandomNumber(lastNames)];
  } else {
    wizardElement.querySelector('.setup-similar-label').textContent = lastNames[getRandomNumber(lastNames)] + ' ' + names[getRandomNumber(names)];
  }
  //  wizardElement.querySelector('.setup-similar-label').textContent = names[getRandomNumber(names)] + ' ' + lastNames[getRandomNumber(lastNames)];
  wizardElement.querySelector('.wizard-coat').style.fill = coatColors[getRandomNumber(coatColors)];
  wizardElement.querySelector('.wizard-eyes').style.fill = eyesColors[getRandomNumber(eyesColors)];

  return wizardElement;
};

// На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template создайте DOM-элементы,
// соответствующие случайно сгенерированным волшебникам и заполните их данными из массива:

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard());
}
// Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list. Для вставки элементов используйте DocumentFragment
var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);

// Покажите блок .setup-similar, удалив у него CSS-класс hidden
document.querySelector('.setup-similar').classList.remove('hidden');
