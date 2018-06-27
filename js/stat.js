'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_Y = 240;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_SPACE = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, font, color) {
  if (font === undefined) {
    font = '16px PT Mono';
  }
  ctx.font = font;
  if (color === undefined) {
    color = '#000000';
  }
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура вы победили!', 120, 30);
  renderText(ctx, 'Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    var BAR_X = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_SPACE) * i;
    ctx.fillText(names[i], BAR_X, BAR_Y + GAP);
    ctx.fillText(Math.round(times[i]), BAR_X, (BAR_Y - (BAR_HEIGHT * times[i]) / maxTime) - GAP * 2);
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(BAR_X, BAR_Y, BAR_WIDTH, ((BAR_HEIGHT * times[i]) / maxTime) * -1);
  }
};

