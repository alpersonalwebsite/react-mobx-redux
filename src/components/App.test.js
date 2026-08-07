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
import axios from 'axios'

// axios is mocked because mounting App dispatches fetchUsers, which would otherwise fire
// a real request at REACT_APP_API_URL. A test called "renders without crashing" should
// not depend on a local API being up, or on there being a network at all.
//
// jest.mock is hoisted above the imports by babel-plugin-jest-hoist wherever it is
// written, so keeping it below them costs nothing and keeps import/first happy.
jest.mock('axios')

// App contains a connect()ed component and an inject()ed one, so rendering it bare
// throws "Could not find store in the context of Connect(UserListRedux)". That is why
// this test had never passed. Both providers are set up here the way index.js does.
beforeEach(() => {
  axios.get.mockResolvedValue({ data: { data: [] } })
  // The MobX stores use window.fetch (the redux half uses axios), so both have to be
  // stubbed or mounting App fires real requests at REACT_APP_API_URL.
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, status: 200, statusText: 'OK', json: () => Promise.resolve({ data: [] }) })
  )
})

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
