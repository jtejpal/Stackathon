import React from "react";
import { connect } from "react-redux";
import { getSpotifyTokenThunk } from "../store/spotifyAuth";
import { getAllSongsThunk } from "../store/allSongs";
import { gotCurrentTrack } from "../store/currentTrack";
import { setCustomerThunk } from "../store/stripe";
import axios from "axios";
import SearchResultMap from "./SearchResultMap";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import FavoriteSongs from "./FavoriteSongs";
import SearchSongs from "./SearchSongs";

class AllSongs extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      searchResult: [],
      currentSong: [],
      play: false,
    };
    this.smallestImage = this.smallestImage.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    //Thunk call to collect songs
    await this.props.getSpotifyToken();
    await this.props.getSongs(this.props.spotifyToken);
    await this.props.setCustomerThunk(this.props.auth.stripeId);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      const { data: searchResults } = await axios.get(
        `https://api.spotify.com/v1/search?q=${this.state.search}&type=track&limit=10`,
        {
          headers: { Authorization: "Bearer " + this.props.spotifyToken },
        }
      );
      this.setState({
        searchResult: searchResults.tracks.items,
      });
    }
  }

  smallestImage(imageArr) {
    const small = imageArr.reduce((smallest, current) => {
      if (current.height < smallest.height) {
        smallest = current;
      }
      return smallest;
    }, imageArr[0]);
    // return small;
    return imageArr[1];
  }
  async clickHandler(track) {
    this.setState({
      currentSong: [track.uri],
      play: true,
    });
    await this.props.gotCurrentTrack(track);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8 pt-3">
            <input
              className="form-control mx-auto"
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search Songs"
            />
          </div>
        </div>
        <div className="container">
          {this.state.search === "" ? (
            <FavoriteSongs
              smallestImage={this.smallestImage}
              clickHandler={this.clickHandler}
            />
          ) : (
            <SearchSongs
              smallestImage={this.smallestImage}
              clickHandler={this.clickHandler}
              searchResult={this.state.searchResult}
            />
          )}
        </div>
        {/* <div className="fixed-bottom">
          <SpotifyWebPlayer
            token={this.props.spotifyToken}
            uris={this.state.currentSong}
            play={this.state.play}
            callback={(state) => {
              if (!state.isPlaying) {
                this.setState({
                  play: false,
                });
              }
            }}
          />
        </div> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    spotifyToken: state.spotifyToken,
    allSongs: state.allSongs,
    currentTrack: state.currentTrack,
    stripeCustomer: state.stripeCustomer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSpotifyToken: () => dispatch(getSpotifyTokenThunk()),
    getSongs: (spotifyToken) => dispatch(getAllSongsThunk(spotifyToken)),
    gotCurrentTrack: (track) => dispatch(gotCurrentTrack(track)),
    setCustomerThunk: (stripeId) => dispatch(setCustomerThunk(stripeId)),
  };
};

export default connect(mapState, mapDispatch)(AllSongs);
