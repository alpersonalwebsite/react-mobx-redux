import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import UserList from './UserList'

class UserListMobex extends Component {
  componentDidMount () {
    this.props.UserStore.fetchUsers()
    this.props.OtherUserStore.fetchUsers()
    this.props.SingleMobexStore.fetchUsers()
  }

  render () {
    const { UserStore, OtherUserStore, SingleMobexStore } = this.props

    // The three blocks were spelled out longhand with an identical JSX shape repeated
    // three times, plus a `let x; x = (...)` pattern that never reassigns. The mapping
    // is the same in all three, so it lives in one component now; what differs is only
    // which store supplies it, which is what a reader is here to see.
    return (
      <React.Fragment>
        <h2>MobX: root store w/ multiple sub stores</h2>
        <UserList {...UserStore} onRetry={UserStore.fetchUsers} />
        <UserList {...OtherUserStore} onRetry={OtherUserStore.fetchUsers} />

        <h2>MobX: independent store</h2>
        <UserList {...SingleMobexStore} onRetry={SingleMobexStore.fetchUsers} />
      </React.Fragment>
    )
  }
}

// inject pulls named stores out of the Provider; observer re-renders this component
// when any observable it READ during the last render changes. Both are needed: inject
// without observer gives you the store once and never updates.
export default inject('UserStore', 'OtherUserStore', 'SingleMobexStore')(observer(UserListMobex))
