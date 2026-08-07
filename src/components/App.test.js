import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as MobexProvider } from 'mobx-react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import mobexStores from '../mobexStores'
import SingleMobexStore from '../SingleMobexStore'
import rootReducer from '../redux/reducers'
import App from './App'

// App contains a connect()ed component and an inject()ed one, so rendering it bare
// throws "Could not find store in the context of Connect(UserListRedux)". That is why
// this test had never passed. Both providers are set up here the way index.js does.
it('renders without crashing', () => {
  const reduxStore = createStore(rootReducer, applyMiddleware(reduxThunk))
  const div = document.createElement('div')

  ReactDOM.render(
    <ReduxProvider store={reduxStore}>
      <MobexProvider {...mobexStores} SingleMobexStore={SingleMobexStore}>
        <App />
      </MobexProvider>
    </ReduxProvider>,
    div
  )

  ReactDOM.unmountComponentAtNode(div)
})
