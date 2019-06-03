import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux/actions'

class UserListRedux extends Component {
  componentDidMount () {
    this.props.fetchUsers()
  }

  render () {
    let userList
    userList = (
      <React.Fragment>
        <ul>
          {this.props.users.map(({ name, lastname, user_id }) => <li key={user_id}>{`${name} ${lastname}`}</li>)}
        </ul>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <h2>Redux: root store</h2>
        {userList}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

export default connect(mapStateToProps, { fetchUsers })(UserListRedux)
