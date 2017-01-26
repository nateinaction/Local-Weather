import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css';
import Now from './containers/Now'

const App = (props) => (
  <div className="App">
    <Now />
  </div>
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
