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

    }
    if(params.access_token) {
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
    spotifyWebApi.searchArtists()
    .then((response) => {
      console.log(response)
      this.setState({
        
      })
    })
  }

  render() {
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
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
