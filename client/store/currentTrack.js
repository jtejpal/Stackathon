

const SET_CURRENT_TRACK = "SET_CURRENT_TRACK"

export const gotCurrentTrack = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    track
  }
}

export default function (state={}, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return action.track
    default:
      return state
  }
}
