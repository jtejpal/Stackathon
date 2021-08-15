import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import lyrics from "../store/lyrics";

class Navbar extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.stripeCustomer !== this.props.stripeCustomer) {
      if (Object.keys(this.props.stripeCustomer).includes("subscriptions")){
        const tier1 = 'prod_K2BSaA3HZuEQjh'
        if (this.props.stripeCustomer.subscriptions.total_count === 0) {
          const lyricsLink = document.getElementById('lyricsLink')
          lyricsLink.setAttribute("hidden", true)
          return
        }
        if (this.props.stripeCustomer.subscriptions.data[0].plan.product === tier1){
          const lyricsLink = document.getElementById('lyricsLink')
          lyricsLink.removeAttribute("hidden")
        }
      }
    }
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
    return (
      <div className="bg-success p-2 text-white bg-opacity-75">
        <h1>Spotify Remix</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/allSongs">Your Songs</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              {/*Create a Lyrics Component*/}
              <Link id="lyricsLink" hidden={true} to="/lyrics">
                Lyrics
              </Link>
              <Link to="/user/memberships">Memberships</Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signup/memberships">Memberships</Link>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    stripeCustomer: state.stripeCustomer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
