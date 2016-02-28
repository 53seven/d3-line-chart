d3-example-bar-chart-plugin
===

[![build status](https://travis-ci.org/53seven/d3-example-bar-chart-plugin.svg)](https://travis-ci.org/53seven/d3-example-bar-chart-plugin)

A reimplementation of [Let's Make a Bar Chart III](https://bost.ocks.org/mike/bar/3/) with the plugin infrastructure of D3v4.

The goal for this package is to serve as a reference for creating reusable and versioned D3 charts that that can be distributed through npm.

## Installing

If you use NPM, `npm install d3-example-bar-chart-plugin`. Otherwise, download the [latest release](https://github.com/53seven/d3-example-bar-chart-plugin/releases/latest).


## Examples

Its best to check out the `example/index.html` file for how this plugin works in practice.

Note: The example makes use of [d3-svg](https://github.com/53seven/d3-svg) which removes the boilerplate of creating a svg element. This library lets the example work by only using D3 plugins, and not the library as a whole.

## Behavior

The chart is a function that can chain several functions together and is ultimately callable by a `d3_select.select`-ed element.

```js

var svg = d3_select.select('svg')
                    .attr('width', 700)
                    .attr('height', 400);


var data = [{letter: 'A', frequency: 0.08}, ....];


var barChart = d3_example_bar_chart_plugin.chart()
                  .width(700)
                  .height(400)
                  .margin({top: 20, right: 30, bottom: 30, left: 40})
                  .data(data)
                  .xValue(function(d) {
                    return d.letter;
                  })
                  .yValue(function(d) {
                    return d.frequency;
                  });


svg.call(barChart);
```

## API Reference

#### d3_example_bar_chart_plugin.chart()

Creates and returns a new `chart`.

##### chart.data([data])

Sets or returns the data to be rendered to the chart.

##### chart.xValue([xValue])

Sets or returns the x value accessor for the data.

##### chart.yValue([yValue])

Sets or returns the y value accessor for the data.

##### chart.width([width])

Sets or returns the width of the chart.

##### chart.height([height])

Sets or returns the height of the chart.

##### chart.margin([margin])

Sets or returns the margins of the chart.

`margin` is a object with the format: `{top: 0, bottom: 0, left: 0, right: 0}`.


## License

MIT