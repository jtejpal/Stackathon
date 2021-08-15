import axios from "axios";

const SET_ALL_SONGS = 'SET_ALL_SONGS'

const gotAllSongs = (allSongs) => {
  return {
    type: SET_ALL_SONGS,
    allSongs
  }
}


export const getAllSongsThunk = (spotifyToken) => {
  return async (dispatch) => {
    try {
      const { data: tracks} = await axios.get('https://api.spotify.com/v1/me/tracks?limit=30', {
        headers: { 'Authorization': 'Bearer ' + spotifyToken }
      })
      dispatch(gotAllSongs(tracks.items))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = [], action) {
  switch(action.type) {
    case SET_ALL_SONGS:
      return action.allSongs
    default:
      return state
  }
}
