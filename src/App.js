import React, { Component } from 'react';
import './styles/css/index.css';
import firebase from './firebase';


class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      playerOneName: '',
      playerTwoName: '',
      winner: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const gamesRef = firebase.database().ref('games');
    const game = {
      playerOne: this.state.playerOneName,
      playerTwo: this.state.playerTwoName,
      winner: ''
    }
    gamesRef.push(game);
    this.setState({
      playerOneName: '',
      playerTwoName: '',
      winner: null
    });
  }
  render() {
    return (
      <div className="scrollbar">
        <header className="gameboard__header">
          <h1>Pool Game Tracker</h1>
        </header>
        <form className="gameboard__wrapper" onSubmit={this.handleSubmit}>
          <div className="gameboard--left">
            <div className="player__name--field">
              <input type="text" name="playerOneName" placeholder="Player One Name" onChange={this.handleChange} value={this.state.playerOneName} />
            </div>
          </div>
          <div className="gameboard--right">
            <div className="player__name--field">
              <input type="text" name="playerTwoName" placeholder="Player Two Name" onChange={this.handleChange} value={this.state.playerTwoName} />
            </div>
            <div className="winner--btn">
              <button><p>submit</p></button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
