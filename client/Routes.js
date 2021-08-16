import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/NewAuthForm';
import Home from './components/Home';
import AllSongs from './components/AllSongs'
import { UserMemberships, SignupMemberships } from './components/Memberships';
import Lyrics from './components/Lyrics';
import PlayerBar from './components/PlayerBar';
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div id="routes" className="bg-dark">
        {isLoggedIn ? (
          <Switch>
            <Route path="/allSongs" component={AllSongs} />
            <Route path="/home" component={Home} />
            <Route path="/user/memberships" component={UserMemberships} />
            <Route path="/signup/memberships" component={SignupMemberships} />
            <Route path="/lyrics" component={Lyrics} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/allSongs" component={AllSongs} />
            <Route path="/lyrics" component={Lyrics} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/user/memberships" component={UserMemberships} />
            <Route path="/signup/memberships" component={SignupMemberships} />
          </Switch>
        )}
        <PlayerBar />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
