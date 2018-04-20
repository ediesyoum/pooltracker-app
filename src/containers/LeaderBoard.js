import React, { Component } from 'react';
import '../styles/css/index.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard__wrapper">
        <div className="leaderboard">
          <ReactTable
            data={this.props.winners}
            columns={[
              {
                Header: "Player Name",
                accessor: "name"
              },
              {
                Header: "Total Wins",
                accessor: "games"
              }
            ]}
          />
        </div>
      </div>
    )
  }
}

export default Leaderboard;
