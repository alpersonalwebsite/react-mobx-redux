import React from 'react'
import UserListMobex from './UserListMobex'
import UserListRedux from './UserListRedux'
import './App.css'

function App () {
  return (
    <React.Fragment>
      <h1>MobX and Redux</h1>
      <div className="row">
        <div className="column">
          <UserListMobex className="column" />
        </div>
        <div className="column">
          <UserListRedux />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
