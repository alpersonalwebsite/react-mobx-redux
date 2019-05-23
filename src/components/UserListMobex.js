import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class UserListMobex extends Component {
  componentDidMount () {
    this.props.UserStore.fetchUsers()
    this.props.OtherUserStore.fetchUsers()
  }

  render () {
    let users
    users = (
      <React.Fragment>
        <h2>Using multiple stores</h2>
        <ul>
          {this.props.UserStore.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    let otherUsers
    otherUsers = (
      <React.Fragment>
        <h2>Using multiple stores</h2>
        <ul>
          {this.props.OtherUserStore.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        {users}
        {otherUsers}
      </React.Fragment>
    )
  }
}

export default inject('UserStore', 'OtherUserStore')(observer(UserListMobex))
