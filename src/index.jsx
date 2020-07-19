import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import Application from './Application';

const rootElement = document.createElement('div');
rootElement.id = 'application-root-node';
rootElement.className = 'app-root';
document.body.appendChild(rootElement);

ReactDOM.render(
  <Application/>,
  rootElement,
);
