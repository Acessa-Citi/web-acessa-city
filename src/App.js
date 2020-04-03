import React, { Component } from 'react';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import firebase from "firebase/app";
import "firebase/auth";
import { login, logout } from 'utils/auth';
import API from 'utils/API';

import firebase from '../enviroments/firebase-enviroment'


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

firebase.auth().onIdTokenChanged(function(user) {
  if (user) {
    API.post('/auth')
  }
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.getIdToken()
      .then((token) => {
        login(token)
      })    
    // ...
  } else {
    logout()
  }
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
