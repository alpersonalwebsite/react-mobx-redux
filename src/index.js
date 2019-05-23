import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import mobexStores from './mobexStores'
import SingleMobexStore from './SingleMobexStore'
import './index.css'

ReactDOM.render(
  <Provider {...mobexStores} SingleMobexStore={SingleMobexStore}>
    <App />
  </Provider>
  , document.getElementById('root'))
