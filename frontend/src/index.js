/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import App from './App';

// Configuração do ReactAlert
const reactAlertOptions = {
  position: positions.TOP_RIGHT,
  offset: '20px',
  timeout: 5000,
  transition: transitions.FADE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...reactAlertOptions}>
    <App />
  </AlertProvider>,
  document.getElementById('root'),
);
