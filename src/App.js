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
    //make sure array is unique - lodash unique method
    //players: _.uniq(players) in line 42
    console.log(players);
    this.setState({ players });
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    return (
        <form className="gameboard__wrapper" onSubmit={this.handleSubmit}>
          <header className="gameboard__header">
            <h1>Pool Game Tracker</h1>
          </header>
          <div className="addplayer__wrapper"/>

          <div className="gameboard--left">
            <div className="player__name--field">
              <input
                type="text"
                name="playerOneName"
                placeholder="Player One Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.playerOneName}
              />
            </div>
          </div>
          <div className="gameboard--right">
            <div className="player__name--field">
              <input
                type="text"
                name="playerTwoName"
                placeholder="Player Two Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.playerTwoName}
              />
            </div>
            <div className="gameboard__winner">
              <select name="winner"
                onChange={this.handleChange}>
                <option value="">
                  Winner Winner Chicken Dinner
                </option>
                {this.state.players.map(player => <option>{player}</option>)}
              </select>
            </div>
            <div className="winner--btn">
              <button><p>submit</p></button>
            </div>
          </div>
          <div className="leaderboard__wrapper">
            <ul>
              <li>Hey there</li>
              <li>Ho there</li>
              <li>Hi there</li>
            </ul>
          </div>
        </form>
    );
  }
}

export default App;
