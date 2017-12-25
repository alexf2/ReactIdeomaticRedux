import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import {Main} from './app/main';

import './index.scss';

ReactDOM.render(
  <BrowserRouter >
    <div>
      <Route path='/' component={Main}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
