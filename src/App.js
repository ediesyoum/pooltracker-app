import React, { Component } from 'react';
import './styles/css/index.css';
import firebase from './firebase';

class App extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    players: [],
    winner: ''
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      playerOneName: '',
      playerTwoName: '',
      players: [],
      winner: null
    });
  }
  handleSubmit(e) {
    const gamesRef = firebase.database().ref('games');
    const game = {
      playerOne: this.state.playerOneName,
      playerTwo: this.state.playerTwoName,
      winner: this.state.winner
    }
    gamesRef.push(game);
    this.handleClearForm(e);
  }
  handleBlur(event) {
    let players = this.state.players;
    players.push(event.target.value);
    console.log(players);
    this.setState({ players });
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    return (
      <main className="gameboard">
        <header className="gameboard__header">
          <h1>Pool Game Tracker</h1>
        </header>

        <div className="addplayer__wrapper">
          <form onSubmit={this.handleSubmit}>
            <h2>Add Player</h2>
            <div className="input__wrapper">
              <input
                type="text"
                className="player-name__input"
                name="playerOneName"
                placeholder="Player One Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.playerOneName}
              />
            </div>
            <div className="winner--btn">
              <button><p>Add Player</p></button>
            </div>
          </form>
        </div>

        <div className="tile winner">
          <form onSubmit={this.handleSubmit}>
            <select name="winner"
              onChange={this.handleChange}>
              <option value="">
                Select Winner
              </option>
              {this.state.players.map(player => <option>{player}</option>)}
            </select>
          </form>
        </div>

        <div className="tile loser">
          <form onSubmit={this.handleSubmit}>
            <select name="loser"
              onChange={this.handleChange}>
              <option value="">
                Select Loser
              </option>
              {this.state.players.map(player => <option>{player}</option>)}
            </select>
          </form>
        </div>

        <div className="submit__wrapper">
          <button><p>Submit Game</p></button>
        </div>

        <div className="leaderboard__wrapper">
          <div className="leaderboard">
            <ul>
              <li>Hey there</li>
              <li>Ho there</li>
              <li>Hi there</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
