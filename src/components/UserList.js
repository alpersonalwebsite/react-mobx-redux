import React from 'react'

// Shared by both halves of the demo, so the MobX and Redux columns differ only in where
// their data comes from, which is the entire point of putting them side by side.
const UserList = ({ users, loading, error, onRetry }) => {
  if (loading) return <p>Loading...</p>

  if (error) {
    return (
      <div style={{ color: '#b00020' }}>
        <p>Could not load: {error}</p>
        {onRetry && <button onClick={onRetry}>Retry</button>}
      </div>
    )
  }

  if (users.length === 0) return <p>No users returned.</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.firstname} {user.lastname}
        </li>
      ))}
    </ul>
  )
}

export default UserList
