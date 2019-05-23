import React from 'react'
import { observer, inject } from 'mobx-react'
import UserListMobex from './UserListMobex'
import './App.css'

function App () {
  return (
    <React.Fragment>
      Hi
      <UserListMobex />
    </React.Fragment>
  )
}

export default App
