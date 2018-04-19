import React, { Component } from 'react';
import '../styles/css/index.css';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard__wrapper">
        <div className="leaderboard">
          <ol>
            {this.props.children}
          </ol>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
