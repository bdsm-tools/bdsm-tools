const extra = (mode) => (mode === 'production' ? mode + '.min' : mode);

module.exports = (mode) => [
  {
    name: 'react',
    var: 'React',
    path: `umd/react.${extra(mode)}.js`,
  },
  {
    name: 'react-dom',
    var: 'ReactDOM',
    path: `umd/react-dom.${extra(mode)}.js`,
  },
  {
    name: 'react-redux',
    var: 'ReactRedux',
    path: `dist/react-redux.js`,
  },
  {
    name: 'lodash',
    var: '_',
    path: `lodash.js`,
  },
  {
    name: 'moment',
    var: 'moment',
    path: mode === 'production' ? 'min/moment.min.js' : 'moment.js',
  },
  // TODO: Seems to be in the wrong format, so causes errors. Must be something to fix but I don't have the time right now
  // {
  //   name: '@react-three/postprocessing',
  //   var: '@react-three/postprocessing',
  //   path: `dist/index.cjs.js`,
  // },
  // {
  //   name: '@react-three/drei',
  //   var: '@react-three/drei',
  //   path: `index.cjs.js`,
  // },
  // {
  //   name: '@react-three/csg',
  //   var: '@react-three/csg',
  //   path: `dist/index.cjs.js`,
  // },
];
