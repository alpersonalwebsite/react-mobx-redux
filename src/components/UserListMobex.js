import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class UserListMobex extends Component {
  componentDidMount () {
    this.props.UserStore.fetchUsers()
    this.props.OtherUserStore.fetchUsers()
    this.props.SingleMobexStore.fetchUsers()
  }

  render () {
    // This can be consolidated in a fn receiving params and returning 1|2|3 but I want to explicit for the sake of clarity
    let users
    users = (
      <React.Fragment>
        <ul>
          {this.props.UserStore.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    let otherUsers
    otherUsers = (
      <React.Fragment>
        <ul>
          {this.props.OtherUserStore.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    let usersSingleStore
    usersSingleStore = (
      <React.Fragment>
        <ul>
          {this.props.SingleMobexStore.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <h2>MobeX: root store w/ multiple sub stores</h2>
        {users}
        {otherUsers}
        <h2>MobeX: Independent stores</h2>
        {usersSingleStore}
      </React.Fragment>
    )
  }
}

export default inject('UserStore', 'OtherUserStore', 'SingleMobexStore')(observer(UserListMobex))
