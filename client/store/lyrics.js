import axios from "axios"


const SET_LYRICS = 'SET_LYRICS'

const gotLyrics = (lyrics) => {
  return {
    type: SET_LYRICS,
    lyrics
  }
}

export const getLyricsThunk = (track, stripeCustomer) => {
  return async (dispatch) => {
    try {
      const artist = track.artists[0].name
      const songName = track.name
      const { data } = await axios.get(`/api/lyrics?artist=${artist}&name=${songName}`, {
        headers: {
          stripeCustomer
        }
      })
      dispatch(gotLyrics(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function (state = '', action) {
  switch(action.type) {
    case SET_LYRICS:
      return action.lyrics
    default:
      return state
  }
}
