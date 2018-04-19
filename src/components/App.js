import React, { Component } from 'react';
import '../styles/css/index.css';
import firebase from '../utils/firebase';
import { groupBy, map, sortBy, reverse } from 'lodash';

class App extends Component {
  componentDidMount() {
    const playersRef = firebase.database().ref('players');
    const gamesRef = firebase.database().ref('games');

    playersRef.once('value').then((snapshot) => {
      const players = map(snapshot.val(), (attributes) => attributes.player);
      this.setState({ players });
    });

    gamesRef.once('value').then((snapshot) => {
      const gamesGroupedByWinner = groupBy(snapshot.val(), 'winner');
      const players = map(gamesGroupedByWinner, (games, winner) => {
          return { name: winner, games: games.length }
      });
      const winners = reverse(sortBy(players, player => player.games));
      this.setState({ winners });
    });
  }
  state = {
    playerName: '',
    players: [],
    winner: '',
    winners: [],
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
    const { players, playerName } = this.state
    const player = {
      player: playerName
    }
    playersRef.push(player);
    players.push(playerName); //local state player array
    this.handleClearForm(e);
    this.setState({ players }); //maintain array
  }
  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPlayer = this.handleSubmitPlayer.bind(this);

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
              {this.state.players.map(player => <option key={player} value={player}>{player}</option>)}
            </select>
          </div>

          <div className="tile loser">
            <select className="dropdown" name="loser"
              onChange={this.handleChange}>
              <option value="">
                Select Loser
              </option>
              {this.state.players.map(player => <option key={player} value={player}>{player}</option>)}
            </select>
          </div>
          <div className="submit__wrapper">
            <button className="btn">Add Game</button>
          </div>
        </form>

        <div className="leaderboard__wrapper">
          <h2 className="title">LeaderBoard</h2>
          <div className="leaderboard">
            <ol>
              {this.state.winners.map(player => <li key={player.name}>{player.name} {player.games}</li>)}
            </ol>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
