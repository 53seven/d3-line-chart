import npm from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index.js',
  plugins: [npm({jsnext: true}), commonjs({})],
  moduleId: 'd3-simple-line-chart',
  moduleName: 'd3-simple-line-chart',
  format: 'umd'
};