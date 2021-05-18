import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import store from './redux/store';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter



ReactDOM.render(
  <Provider store = { store }>
  <Router>
    <App />
 </Router>
 </Provider>,
  document.getElementById('root')
);



