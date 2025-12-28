// src/index.js - Pure JavaScript (NO JSX)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Pure JavaScript - NO JSX
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App, null)
  )
);