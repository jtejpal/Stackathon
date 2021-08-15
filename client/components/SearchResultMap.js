import React from "react";

class SearchResultMap extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const track = this.props.track
    const artistList = this.props.track.artists.reduce((artistArr, artist) => {
      artistArr.push(artist.name)
      return artistArr
    },[])
    return (
      <div className="col-3 my-3 mx-2 card bg-dark bg-opacity-50 bg-gradient text-white shadow" onClick={() => this.props.clickHandler(this.props.track)}>
        <img className="shadow-sm card-img-top rounded mt-4" src={track.albumUrl.url} />
        <div className="card-body">
          <h4 className="fw-bolder text-white card-text text-truncate">{track.name}</h4>
          <h5 className="fw-bold text-white text-muted card-text text-truncate">{artistList.join(', ')}</h5>
        </div>
      </div>
    );
  }
}

export default SearchResultMap;
