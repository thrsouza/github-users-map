import React, { Fragment } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';

import './styles/global.scss';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
      <ToastContainer autoClose={5000} />
    </Fragment>
  </Provider>
);

export default App;
