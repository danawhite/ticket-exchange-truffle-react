import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux';

import App from './App'

it('renders without crashing', () => {
  const fakeStore = {
    subscribe: () => {},
    getState: () => {},
    item: 'fake item'
  };

  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={fakeStore}>
        <App />
      </Provider>, div)
});
