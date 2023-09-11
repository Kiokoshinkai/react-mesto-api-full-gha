import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './components/Root';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
