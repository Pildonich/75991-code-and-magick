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

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, font, color) {
  ctx.font = font || '16px PT Mono';
  ctx.fillStyle = color || '#000000';
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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  renderText(ctx, 'Ура вы победили!', 120, 30);
  renderText(ctx, 'Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var BAR_X = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_SPACE) * i;
    var ratioBar = (BAR_HEIGHT * times[i]) / maxTime;
    renderText(ctx, names[i], BAR_X, BAR_Y + GAP);
    renderText(ctx, Math.round(times[i]), BAR_X, BAR_Y - ratioBar - GAP * 2);
    renderCloud(ctx, BAR_X, BAR_Y, BAR_WIDTH, ratioBar * -1, (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')');
  }
};

