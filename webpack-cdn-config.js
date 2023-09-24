const extra = (mode) => mode === 'production'
  ? mode + '.min'
  : mode;

module.exports = (mode) => [
  {
    name: 'react',
    var: 'React',
    path: `umd/react.${extra(mode)}.js`
  }, {
    name: 'react-dom',
    var: 'ReactDOM',
    path: `umd/react-dom.${extra(mode)}.js`
  }, {
    name: 'react-redux',
    var: 'ReactRedux',
    path: `dist/react-redux${extra('')}.js`
  }, {
    name: 'lodash',
    var: '_',
    path: `lodash${extra('')}.js`,
  }, {
    name: 'moment',
    var: 'moment',
    path: mode === 'production' ? 'min/moment.min.js' : 'moment.js',
  }, {
    name: 'antd',
    var: 'antd',
    path: `dist/antd${extra('')}.js`
  },
];