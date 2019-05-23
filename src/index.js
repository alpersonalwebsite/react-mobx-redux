import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import mobexStores from './mobexStores'
import './index.css'

ReactDOM.render(
  <Provider {...mobexStores}>
    <App />
  </Provider>
  , document.getElementById('root'))
