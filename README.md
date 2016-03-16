d3-line-chart-plugin
===

[![build status](https://travis-ci.org/53seven/d3-line-chart.svg)](https://travis-ci.org/53seven/d3-line-chart)

A reimplementation of Mike's [Line Chart](https://bl.ocks.org/mbostock/3883245) with the plugin infrastructure of D3v4.

The goal for this package is to serve as a reference for creating reusable and versioned D3 charts that that can be distributed through npm.

## Installing

If you use NPM, `npm install d3-line-chart-plugin`. Otherwise, download the [latest release](https://github.com/53seven/d3-line-chart-plugin/releases/latest).


## Examples

Its best to check out the `example/index.html` file for how this plugin works in practice.

Note: The example makes use of [d3-svg](https://github.com/53seven/d3-svg) which removes the boilerplate of creating a svg element. This library lets the example work by only using D3 plugins, and not the library as a whole.

## Behavior

The chart is a function that can chain several functions together and is ultimately callable by a `d3_select.select`-ed element.

```js

var svg = d3_select.select('svg')
                    .attr('width', 700)
                    .attr('height', 400);


var data = [{date: new Date('2010-01-01'), frequency: 0.08}, ....];


var barChart = d3_line_chart.chart()
                  .width(700)
                  .height(400)
                  .margin({top: 20, right: 30, bottom: 30, left: 40})
                  .xValue(function(d) {
                    return d.date;
                  })
                  .yValue(function(d) {
                    return d.frequency;
                  });


svg.datum(data) // NOTE: datum not data
  .call(barChart);
```

## API Reference

#### d3_line_chart.chart()

Creates and returns a new `chart`.

##### chart.xValue([xValue])

Sets or returns the x value accessor for the data. Currently only `Date` objects will cause the chart to render correctly.

##### chart.yValue([yValue])

Sets or returns the y value accessor for the data.

##### chart.width([width])

Sets or returns the width of the chart.

##### chart.height([height])

Sets or returns the height of the chart.

##### chart.margin([margin])

Sets or returns the margins of the chart.

`margin` is a object with the format: `{top: 0, bottom: 0, left: 0, right: 0}`.

##### chart.x([x]), chart.y([y])

Sets or returns the x, y scales that are used to render the chart. Defaults:

```js
x = d3_scale.scaleTime();
y = d3_scale.scaleLinear();
```

##### chart.xDomain([domain]), chart.yDomain([domain])

Sets or returns the domains to be used for the scales of the x and y axis. If these are not specified then the domains are calculated at render time in the following way:

```js
x_domain = extent(data, xValue);
y_domain = [0, max(data, yValue)];
```

##### chart.g()

Returns the `g` element that contains all elements in the chart. This element is scaled and translated based on the `margin` property.

##### chart.xAxis(), chart.yAxis()

Returns the x or y axis objects that the chart will use for rendering. These methods are useful for altering the tick formatting and properties for the chart before it gets rendered.

## License

MIT