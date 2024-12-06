module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
    'plugin:@react-three/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'css-modules', '@react-three'],
  settings: {
    react: {
      version: '18',
    },
  },
  rules: {
    '@react-three/no-clone-in-frame-loop': 'error',
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/display-name': ['off'],
  },
};
