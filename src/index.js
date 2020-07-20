import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import Game from './containers/game.js';
import { store } from "./store/index.js";

import { Provider } from "react-redux";

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
      <Game />
    </Provider>,
    rootElement
  );