import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './style/index.less';
import Application from './Application';

if (process.env.VERSION !== 'development') {
  const { protocol } = window.location;
  if (protocol !== 'https:') {
    window.location.protocol = 'https:';
  }
}

const rootElement = document.createElement('div');
rootElement.id = 'application-root-node';
rootElement.className = 'app-root';
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(<Application/>);
