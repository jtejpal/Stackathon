import axios from "axios";

const GET_SPOTIFY_TOKEN = 'GET_SPOTIFY_TOKEN'

const gotSpotifyToken = (token) => {
  return {
    type: GET_SPOTIFY_TOKEN,
    token
  }
}

export const getSpotifyTokenThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/spotify/cookie')
      dispatch(gotSpotifyToken(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = '', action) {
  switch(action.type) {
    case GET_SPOTIFY_TOKEN:
      return action.token
    default:
      return state
  }
}
