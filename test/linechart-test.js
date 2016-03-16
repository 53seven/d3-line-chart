// barchart-test.js
var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    d3_svg = require('d3-svg'),
    bar_chart = require('../');

tape('line chart is callable on a svg element', function(test) {
  var document = jsdom.jsdom();
  global.document = document;
  var svg = d3_svg.create('body');
  test.ok(svg, 'svg element exists');
  var chart = bar_chart.chart();

  test.doesNotThrow(function() {
    svg.datum([]).call(chart);
  });

  delete global.document;
  test.end();
});
