// responsible for calculating the amount of times a player has won pool

class Leaderboard extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children && React.cloneElement(this.props.children, {
          firebaseRef: firebase.database().ref('games'),
          games: this.state.games,
          playerOneName: this.state.playerOneName,
          playerTwoName: this.state.playerTwoName,
          winner: this.state.winner
        })}
      </div>
    )
  }
}
