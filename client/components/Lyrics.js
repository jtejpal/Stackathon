import React from 'react'
import { connect } from "react-redux";
import { getLyricsThunk } from "../store/lyrics"


class Lyrics extends React.Component {
  constructor() {
    super()
    this.state = {
      lyrics: ''
    }
  }

  componentDidMount() {
    this.props.getLyrics(this.props.track, this.props.stripeCustomer)
  }

  render() {
    const lyrics = this.props.lyrics.lyrics
    return (
      <div className="container fw-bold min-vh-100 text-white">
        <div className="row">
          <div className="col-12 mt-5">
            <h3 id="lyrics_wrap" className="text-center">{lyrics}</h3>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    track: state.currentTrack,
    lyrics: state.lyrics,
    stripeCustomer: state.stripeCustomer
  }
}

const mapDispatch = (dispatch) => {
  return {
    getLyrics: (track) => dispatch(getLyricsThunk(track))
  }
}


export default connect(mapState, mapDispatch)(Lyrics)
