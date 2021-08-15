const router = require("express").Router();
const axios = require("axios");
// const cors = require('cors');
const querystring = require("querystring");
// const cookieParser = require('cookie-parser');
module.exports = router;

const client_id = "63b6590c08544d26816f290d6021e4af"; // Your client id
const client_secret = "6de2995f4edd4b93b5c906834123b30a"; // Your secret
const redirect_uri = "http://localhost:8080/api/spotify/callback"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

router.get("/login", function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope =
    "streaming user-read-private user-read-email user-library-read user-read-playback-state user-modify-playback-state user-library-modify";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true,
      })
  );
});

router.get("/callback", async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log("inside callback");
  console.log("req.query", req.query);
  console.log("code", req.query.code);
  if (state === null || state !== storedState) {
    console.log("inside if");
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    console.log("inside else");
    console.log("cookies", req.cookies);

    res.clearCookie(stateKey);
    const crypt = client_id + ":" + client_secret;
    const buff = new Buffer.from(crypt);
    const base64data = buff.toString("base64");
    try {
      console.log("in TRY");
      console.log("code", code);
      console.log("redirect", redirect_uri);
      console.log("base64data", base64data);

      const { data: body } = await axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        params: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: "Basic " + base64data,
        },
      });
      let access_token = body.access_token;
      let refresh_token = body.refresh_token;
      res.cookie("spotifyToken", access_token, { httpOnly: true });
      const { data: auth } = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + access_token },
      });
      const { data: tracks } = await axios.get(
        "https://api.spotify.com/v1/me/tracks?limit=2",
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      );
      res.redirect("/allSongs");
      // res.redirect('/#' +
      //   querystring.stringify({
      //     access_token: access_token,
      //     refresh_token: refresh_token
      // }));
    } catch (error) {
      console.log("in CATCH");
      console.log("code", code);
      console.log("redirect", redirect_uri);
      console.log("base64data", base64data);
      code
        ? res.redirect("/allSongs")
        : res.redirect("/login" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
      // res.redirect('/#' +
      //   querystring.stringify({
      //     error: 'invalid_token'
      //   }
      // ));
      console.log(error);
    }
  }
});

router.get("/refresh_token", async function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;

  const crypt = client_id + ":" + client_secret;
  const buff = new Buffer.from(crypt);
  const base64data = buff.toString("base64");
  try {
    const { data: body } = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      headers: {
        Authorization: "Basic " + base64data,
      },
    });
    const access_token = body.access_token;
    res.send({
      access_token: access_token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/cookie", (req, res, next) => {
  try {
    const token = req.cookies.spotifyToken;
    res.json(token);
  } catch (error) {
    console.log(error);
  }
});
