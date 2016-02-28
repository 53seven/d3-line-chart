// bar_chart.js
import * as d3_selection from 'd3-selection';
import {max as d3_max} from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

export default function constructor() {
  // properties for the chart
  var data = null,
      // identity function
      xValue = function(d) { return d; },
      yValue = function(d) { return d; },
      // default to some height - zeros is just going to be confusing
      width = 700,
      height = 400,
      // default to zero margins
      margin = {top: 0, right: 0, bottom: 0, left: 0};

  function line_chart(selection) {
    selection.each(function(d, i) {

      // figure out the charts height and width to fit with the margins
      var chartHeight = height - margin.top - margin.bottom,
          chartWidth = width - margin.left - margin.right;

      // select the element that we want to append the chart to
      var chart = d3_selection.select(this)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var x = d3_scale.scaleBand()
          .rangeRound([0, chartWidth])
          .paddingInner(0.1);

      var y = d3_scale.scaleLinear()
          .range([chartHeight, 0]);

      var xAxis = d3_axis.axisBottom()
          .scale(x);

      var yAxis = d3_axis.axisLeft()
          .scale(y)
          .ticks(10, '%');

      x.domain(data.map(xValue));
      y.domain([0, d3_max(data, yValue)]);

      chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + chartHeight + ')')
          .call(xAxis);

      chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Frequency');

      chart.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(xValue(d)); })
          .attr('y', function(d) { return y(yValue(d)); })
          .attr('height', function(d) { return chartHeight - y(yValue(d)); })
          .attr('width', x.bandwidth());
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

  return line_chart;
}
