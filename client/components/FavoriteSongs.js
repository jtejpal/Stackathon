import React from "react";
import { connect } from "react-redux";
import { getSpotifyTokenThunk } from "../store/spotifyAuth";
import { getAllSongsThunk } from "../store/allSongs";

class FavoriteSongs extends React.Component {
  async componentDidMount() {
    await this.props.getSpotifyToken();
    await this.props.getSongs(this.props.spotifyToken);
  }

  render() {
    const songs = this.props.allSongs || [];
    return (
      <div className="row justify-content-around">
        {songs.map((song) => {
          const songInfo = song.track;
          const image = songInfo.album.images
            ? this.props.smallestImage(songInfo.album.images)
            : null;
          const artistList = songInfo.artists.reduce((artistArr, artist) => {
            artistArr.push(artist.name)
            return artistArr
          },[])

          return (
            <div
              className="col-3 my-3 mx-2 card bg-dark bg-opacity-50 bg-gradient text-white shadow"
              key={songInfo.id}
              onClick={() => this.props.clickHandler(songInfo)}
            >
              <img className="shadow-sm card-img-top rounded mt-4" src={`${image.url}`} />
              <div className="card-body">
                <h4 className="fw-bolder text-white card-text text-truncate">{songInfo.name}</h4>
                <h5 className="fw-bold text-white text-muted card-text text-truncate">{artistList.join(', ')}</h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    spotifyToken: state.spotifyToken,
    allSongs: state.allSongs,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSpotifyToken: () => dispatch(getSpotifyTokenThunk()),
    getSongs: (spotifyToken) => dispatch(getAllSongsThunk(spotifyToken)),
  };
};

export default connect(mapState, mapDispatch)(FavoriteSongs);
