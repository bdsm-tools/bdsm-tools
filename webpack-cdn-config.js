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
    name: 'react-router-dom',
    var: 'ReactRouterDOM',
    path: `umd/react-router-dom${extra('')}.js`
  }, {
    name: 'antd',
    var: 'antd',
    path: `dist/antd${extra('')}.js`
  },
];