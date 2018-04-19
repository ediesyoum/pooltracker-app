import React, { Component } from 'react';
import '../styles/css/index.css';
import Leaderboard from '../containers/LeaderBoard';
import firebase from '../utils/firebase';

class App extends Component {
  componentDidMount() {
    const playersRef = firebase.database().ref('players');
    const players = playersRef.once('value').then(function(snapshot) {
      console.log(snapshot.val());
    });
  }
  state = {
    playerName: '',
    players: [],
    winner: '',
    loser: ''
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      playerName: '',
      players: [],
      winner: '',
      loser: ''
    });
  }
  handleSubmit(e) {
    const gamesRef = firebase.database().ref('games');
    const game = {
      winner: this.state.winner,
      loser: this.state.loser
    }
    gamesRef.push(game);
    this.handleClearForm(e);
  }
  handleSubmitPlayer(e) {
    const playersRef = firebase.database().ref('players');
    const player = {
      player: this.state.playerName
    }
    playersRef.push(player);
    this.handleClearForm(e);
  }
  handleBlur(event) {
    let players = this.state.players;
    players.push(event.target.value); //local push
    //make sure array is unique - lodash unique method
    //players: _.uniq(players) in line 42
    console.log(players);
    this.setState({ players });
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPlayer = this.handleSubmitPlayer.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    return (
      <main className="gameboard">
        <header className="gameboard__header">
          <h1>Pool Game Tracker</h1>
        </header>

        <form className="form-custom" onSubmit={this.handleSubmitPlayer}>
          <div className="addplayer__wrapper">
            <h2 className="title">Add Player</h2>
              <input
                type="text"
                className="player-name__input"
                name="playerName"
                placeholder="Player Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.playerName}
              />
            <button className="btn">Add Player</button>
          </div>
        </form>

        <form className="form-custom" onSubmit={this.handleSubmit}>
          <div className="tile winner">
            <select className="dropdown" name="winner"
              onChange={this.handleChange}>
              <option value="">
                Select Winner
              </option>
              {this.state.players.map(player => <option>{player}</option>)}
            </select>
          </div>

          <div className="tile loser">
            <select className="dropdown" name="loser"
              onChange={this.handleChange}>
              <option value="">
                Select Loser
              </option>
              {this.state.players.map(player => <option>{player}</option>)}
            </select>
          </div>
          <div className="submit__wrapper">
            <button className="btn">Add Game</button>
          </div>
        </form>

        <Leaderboard>
          <h2 className="title">LeaderBoard</h2>
        </Leaderboard>
      </main>
    );
  }
}

export default App;
