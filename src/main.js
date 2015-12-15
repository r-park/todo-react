import 'babel-polyfill';
import 'styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'components/root';


window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.querySelector('.app-root'));
});
