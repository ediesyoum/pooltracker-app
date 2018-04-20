import React, { Component } from 'react';
import '../styles/css/index.css';
import firebase from '../utils/firebase';
import LeaderBoard from '../containers/LeaderBoard';
import { groupBy, map, sortBy, reverse } from 'lodash';

class App extends Component {
  componentDidMount() {
    const playersRef = firebase.database().ref('players');
    const gamesRef = firebase.database().ref('games');

    playersRef.once('value').then((snapshot) => {
      const players = map(snapshot.val(), (attributes) => attributes.player);
      this.setState({ players });
    });

    gamesRef.on("value", (snapshot) => {
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
  gameCanBeSubmitted() {
    const { winner, loser } = this.state;
    return (
      winner.length > 0 &&
      loser.length > 0
    );
  }
  handleSubmitGame(e) {
    if (!this.gameCanBeSubmitted()) {
      e.preventDefault();
      return;
    }
    const gamesRef = firebase.database().ref('games');
    const game = {
      winner: this.state.winner,
      loser: this.state.loser
    }
    gamesRef.push(game);
    this.handleClearForm(e);
  }
  playerCanBeSubmitted() {
    const { playerName } = this.state;
    return (
      playerName.length > 0
    );
  }
  handleSubmitPlayer(e) {
    if (!this.playerCanBeSubmitted()) {
      e.preventDefault();
      return;
    }
    const playersRef = firebase.database().ref('players');
    const { players, playerName } = this.state;
    const player = {
      player: playerName
    }
    playersRef.push(player);
    players.push(playerName);
    this.handleClearForm(e);
    this.setState({ players });
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitGame = this.handleSubmitGame.bind(this);
    this.handleSubmitPlayer = this.handleSubmitPlayer.bind(this);
    const playerBtnIsEnabled = this.playerCanBeSubmitted();
    const gameBtnIsEnabled = this.gameCanBeSubmitted();

    return (
      <main className="gameboard">
        <header className="gameboard__header">
          <h1>Pool Game Tracker</h1>
        </header>

        <div className="form__wrapper">
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
              <button disabled={!playerBtnIsEnabled} className="btn">
                Add Player
              </button>
            </div>
          </form>

          <form className="form-custom" onSubmit={this.handleSubmitGame}>
            <div className="winner tile">
              <select className="dropdown" name="winner"
                onChange={this.handleChange}>
                <option value="">
                  Select Winner
                </option>
                {this.state.players.map(player =>
                  <option key={player} value={player}>{player}</option>
                )}
              </select>
            </div>

            <div className="loser tile">
              <select className="dropdown" name="loser"
                onChange={this.handleChange}>
                <option value="">
                  Select Loser
                </option>
                {this.state.players.map(player =>
                  <option key={player} value={player}>{player}</option>
                )}
              </select>
            </div>
            <div className="submit__wrapper">
              <button disabled={!gameBtnIsEnabled} className="btn">
                Add Game
              </button>
            </div>
          </form>
        </div>

        <LeaderBoard winners={this.state.winners}/>
      </main>
    );
  }
}

export default App;
