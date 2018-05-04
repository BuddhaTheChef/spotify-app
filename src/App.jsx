import React, {Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      query: '',
      artist: null

    }
    if(params.access_token) {
      console.log(params.access_token)
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

    //PUT BEOFRE EVERY SESSION

   var accessToken = '';

    var myOptions = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  },
  mode: 'cors',
  cache: 'default'
};

fetch(FETCH_URL, myOptions)
  .then(response => response.json())
  .then(json => {
    console.log('Things:',json)
    const artist = json.artists.items[0];
    this.setState({ artist });
  })
  }

  render() {
    let artist = {
    name: '',
    followers: {
      total: ''
    },
    images: [{url: ''}],
    genres: []
  };
  if (this.state.artist !== null) {
    console.log(artist)
    artist = this.state.artist;
  }

    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button>Login with Spotify</button>
        </a>

        <div className="App-title">
          Music Master
        </div>
        <div>
          <input
            className="input-area"
            placeholder="search an artist..."
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if(event.key === "Enter") {
                this.search()
              }
            }}
          />
          <button className="submit-button" onClick={() => this.search()}>Submit</button>
        </div>
        <div className="profile">
          <img
            alt="PROFILE"
            className="profile-img"
            src={artist.images[0].url}
           />
           <div className="profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-followers">{artist.followers.total} followers</div>
          <div className="profile-genres">
            {
              artist .genres.map((genre, k) => {
                genre = genre !== artist.genres[artist.genres.length-1] ? `${genre}, ` : ` & ${genre}`;
                return (
                  <span key={k}>{genre}</span>
                )
              })
            }
          </div>
        </div>
      </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
