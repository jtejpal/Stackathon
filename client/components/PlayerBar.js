import React from "react";
import { connect } from "react-redux";
import { getSpotifyTokenThunk } from "../store/spotifyAuth";

import SpotifyWebPlayer from "react-spotify-web-playback/lib";

class PlayerBar extends React.Component {
  constructor() {
    super();
    this.state = {
      play: false,
    };
  }

  async componentDidMount() {
    //Thunk call to collect songs
    await this.props.getSpotifyToken();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.track.uri !== this.props.track.uri) {
      this.setState({
        play: true,
      });
    }
    if (Object.keys(prevProps.track).length === 0 && this.props.track.uri) {
      this.setState({
        play: true,
      });
    }
  }

  render() {
    const track = this.props.track;
    let display = false;
    if (this.props.spotifyToken !== "" && Object.keys(track).length !== 0) {
      display = true;
    } else {
      display = false;
    }
    return (
      <div className="fixed-bottom">
        {display && (
          <SpotifyWebPlayer
            token={this.props.spotifyToken}
            uris={[track.uri]}
            autoPlay={true}
            play={this.state.play}
            callback={(state) => {
              if (!state.isPlaying) {
                this.setState({
                  play: false,
                });
              }
            }}
          />
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    spotifyToken: state.spotifyToken,
    track: state.currentTrack,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSpotifyToken: () => dispatch(getSpotifyTokenThunk()),
  };
};

export default connect(mapState, mapDispatch)(PlayerBar);
