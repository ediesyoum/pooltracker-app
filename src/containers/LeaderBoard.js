import React, { Component } from 'react';
import '../styles/css/index.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard__wrapper">
        <h3 className="leaderboard__title">Leaderboard</h3>
        <ReactTable
          data={this.props.winners}
          className={"leaderboard"}
          showPagination={false}
          columns={[
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Wins",
              accessor: "games"
            }
          ]}
        />
      </div>
    )
  }
}

export default Leaderboard;
