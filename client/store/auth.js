import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const UPDATE_USER_STRIPE_ID = "UPDATE_USER_STRIPE_ID"

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

const updateUser = (user) => {
  return {
    type: UPDATE_USER_STRIPE_ID,
    user
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

//Updating User StripeId property
export const updateUserStripeIdThunk = (userId, stripeId) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await axios.put(`/api/users/${userId}`, {stripeId})
      dispatch(updateUser(updatedUser))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case UPDATE_USER_STRIPE_ID:
      return action.user
    default:
      return state
  }
}
