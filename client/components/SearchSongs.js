import React from "react";
import SearchResultMap from "./SearchResultMap";


class SearchSongs extends React.Component {
  render() {
    return (
      <div className="row justify-content-around">
        {this.props.searchResult.map((track) => {
          const image = track.album.images
            ? this.props.smallestImage(track.album.images)
            : null;
          track.albumUrl = image;
          return (
            <SearchResultMap
              track={track}
              key={track.id}
              clickHandler={this.props.clickHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default SearchSongs;
