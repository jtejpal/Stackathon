import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props
  return (
    <div className="fw-bold text-whiite">
      <h3>Welcome, {username}</h3>
      <a href="api/spotify/login">Log in with Spotify</a>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    stripeCustomer: state.stripeCustomer
  }
}

export default connect(mapState)(Home)
