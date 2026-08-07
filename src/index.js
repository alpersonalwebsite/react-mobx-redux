import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { Provider as MobexProvider } from 'mobx-react'
import mobexStores from './mobexStores'
import SingleMobexStore from './SingleMobexStore'

import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './redux/reducers'

import './index.css'

// Redux DevTools in development only. The old form ended in `: null || compose`, where
// `null ||` was dead code, since the ternary had already chosen a branch.
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <MobexProvider {...mobexStores} SingleMobexStore={SingleMobexStore}>
      <App />
    </MobexProvider>
  </ReduxProvider>
  , document.getElementById('root'))
