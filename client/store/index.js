import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import spotifyToken from './spotifyAuth'
import allSongs from './allSongs'
import currentTrack from './currentTrack'
import lyrics from './lyrics'
import stripeCustomer from './stripe'
import stripeSubscription from './stripeSubscription'

const reducer = combineReducers({
  auth,
  spotifyToken,
  allSongs,
  currentTrack,
  lyrics,
  stripeCustomer,
  stripeSubscription
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
