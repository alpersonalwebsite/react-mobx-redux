import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from '../redux/actions'
import UserList from './UserList'

class UserListRedux extends Component {
  componentDidMount () {
    this.props.fetchUsers()
  }

  render () {
    const { users, loading, error, fetchUsers: retry } = this.props

    return (
      <React.Fragment>
        <h2>Redux: root store</h2>
        <UserList users={users} loading={loading} error={error} onRetry={retry} />
      </React.Fragment>
    )
  }
}

// The reducer owns a shape now rather than a bare array, so this unpacks it.
const mapStateToProps = ({ users }) => ({
  users: users.items,
  loading: users.loading,
  error: users.error
})

export default connect(mapStateToProps, { fetchUsers })(UserListRedux)
