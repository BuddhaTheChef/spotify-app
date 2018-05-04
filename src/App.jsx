import React, {Component} from 'react';
import './App.css';
// import Spotify from 'spotify-web-api-js';

// const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.state ={
      // loggedIn: params.access_token ? true : false,
      query: '',
      artist: null

    }
    // if(params.access_token) {
    //   console.log(params.access_token)
    //   spotifyWebApi.setAccessToken(params.access_token)
    // }
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

    //APUT BEOFRE EVERY SESSION

   var accessToken = ''

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

    // console.log('FETCH_URL', FETCH_URL);
    // fetch(FETCH_URL, {
    //   method: 'GET'
    // }).then(response => response.json())
    // .then(json => console.log('json', json));

    // spotifyWebApi.searchArtists()
    // .then((response) => {
    //   console.log(response)
    //   this.setState({
    //
    //   })
    // })
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
          <input placeholder="search an artist..."
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if(event.key === "Enter") {
                this.search()
              }
            }}
          />
          <button onClick={() => this.search()}>Submit</button>
        </div>
        <div className="Profile">
          <img
            alt="PROFILE_PIC"
            className="profile-img"
            src={artist.images[0].url}
           />
          <div>{artist.name}</div>
          <div>{artist.followers.total}</div>
          <div>
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
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
