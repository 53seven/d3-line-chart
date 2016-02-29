// bar_chart.js
import * as d3_selection from 'd3-selection';
import {max as d3_max, extent as d3_extent} from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';
import * as d3_shape from 'd3-shape';

export default function constructor() {
  // properties for the chart
  var data = null,
      // identity function
      xValue = function(d) { return d; },
      yValue = function(d) { return d; },
      x_domain, y_domain,
      // default to some height - zeros is just going to be confusing
      width = 700,
      height = 400,
      // default to zero margins
      margin = {top: 0, right: 0, bottom: 0, left: 0},
      x_axis_title = '', y_axis_title = '';

  // d3 components that we want to make available on getters
  var x = d3_scale.scaleTime();
  var y = d3_scale.scaleLinear();

  var xAxis = d3_axis.axisBottom().scale(x);
  var yAxis = d3_axis.axisLeft().scale(y);

  var chartG;

  function line_chart(selection) {
    selection.each(function(d, i) {

      // figure out the charts height and width to fit with the margins
      var chartHeight = height - margin.top - margin.bottom,
          chartWidth = width - margin.left - margin.right;

      // select the element that we want to append the chart to
      chartG = d3_selection.select(this)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (!x_domain) {
        x_domain = d3_extent(data, xValue);
      }
      if (!y_domain) {
        y_domain = [0, d3_max(data, yValue)];
      }

      x.domain(x_domain);
      y.domain(y_domain);

      x.range([0, chartWidth]);
      y.range([chartHeight, 0]);


      var line = d3_shape.line()
          .x(function(d) { return x(xValue(d)); })
          .y(function(d) { return y(yValue(d)); });

      chartG.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + chartHeight + ')')
          .call(xAxis);

      chartG.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text(y_axis_title);

      chartG.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line);
    });
  }

  line_chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return line_chart;
  };

  line_chart.xValue = function(val) {
    if (!arguments.length) {
      return xValue;
    }
    xValue = val;
    return line_chart;
  };

  line_chart.yValue = function(val) {
    if (!arguments.length) {
      return yValue;
    }
    yValue = val;
    return line_chart;
  };

  line_chart.width = function(val) {
    if (!arguments.length) {
      return width;
    }
    width = val;
    return line_chart;
  };

  line_chart.height = function(val) {
    if (!arguments.length) {
      return height;
    }
    height = val;
    return line_chart;
  };

  line_chart.margin = function(val) {
    if (!arguments.length) {
      return margin;
    }
    margin = val;
    return line_chart;
  };

  line_chart.xAxisTitle = function(val) {
    if (!arguments.length) {
      return x_axis_title;
    }
    x_axis_title = val;
    return line_chart;
  };

  line_chart.yAxisTitle = function(val) {
    if (!arguments.length) {
      return y_axis_title;
    }
    y_axis_title = val;
    return line_chart;
  };

  line_chart.xDomain = function(val) {
    if (!arguments.length) {
      return x_domain;
    }
    x_domain = val;
    return line_chart;
  };

  line_chart.yDomain = function(val) {
    if (!arguments.length) {
      return y_domain;
    }
    y_domain = val;
    return line_chart;
  };

  line_chart.g = function() {
    return chartG;
  };

  line_chart.xAxis = function() {
    return xAxis;
  };

  line_chart.yAxis = function() {
    return yAxis;
  };

  return line_chart;
}
