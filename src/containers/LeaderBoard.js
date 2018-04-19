import React, { Component } from 'react';
import '../styles/css/index.css';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard__wrapper">
        {this.props.children}
        <div className="leaderboard">
          <ul>
            <li>Hey there</li>
            <li>Ho there</li>
            <li>Hi there</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
