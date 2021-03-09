import React, { Component } from "react";
import GameCard from "./GameCard";
import DropDown from "./DropDown";
import DB from "../utils/DB";

class SearchResultContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: [],
      teams: [],
      users: [],
      home_team_id: "2",
      userId: "1",
    }; 
  } 

  componentDidMount() {
    DB.getUsers()
    .then(res => {
      this.setState({
          users: res.data.users.map( e => ({
          name: e.username,
          id: e.id            
        }))          
      })    
    })
    .catch(err => console.log(err));

    DB.getGamesbyId(this.state.home_team_id)
      .then(res => {
        this.setState({
          games: res.data.games.map((e, i) => ({
            homeTeam: e.home_team.name,
            visitingTeam: e.opp_team.name,
            winningTeam: ( e.home_team_id === e.win_team_id ? e.home_team.name : e.opp_team.name ),
            key: i
          }))
        })     
      })
      .catch(err => console.log(err));
  };

  getTeams(userId) {
    DB.getTeamsbyId(userId)
    .then(res => {
      this.setState({          
        teams: res.data.teams.map( e => ({
          name: e.name,
          id: e.id            
        }))          
      })    
    })
    .catch(err => console.log(err));
  }

  getGames(team_id) {
    DB.getGamesbyId(team_id)
      .then(res => {
        this.setState({
          games: res.data.games.map((e, i) => ({
            homeTeam: e.home_team.name,
            visitingTeam: e.opp_team.name,
            winningTeam: ( e.home_team_id === e.win_team_id ? e.home_team.name : e.opp_team.name ),
            key: i
          }))
        })    
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value      
    });
    if (name === "userId") {
      this.getTeams(value);
    }
    if (name === "home_team_id"){
      this.getGames(value);
    }
  };  

  render()   
  {
    return (          
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Game History</h2>
          </div>
        </div>
        <div className="row">
          User Name:
          <div className="dropdown">
            <DropDown options={this.state.users} handleInputChange={this.handleInputChange} type="userId">      
            </DropDown>
          </div>
        </div>        
        <div className="row">
          Team Name:
          <div className="dropdown">
          <DropDown options = {this.state.teams} handleInputChange={this.handleInputChange} type="home_team_id">      
            </DropDown>
          </div>
        </div>
        <div className="row">
          <table className="table">
            <tbody>
              <tr>
                  <th scope="col">Home Team</th>
                  <th>Visiting Team</th>
                  <th scope="col">Winning Team </th>
              </tr>
              {[...this.state.games].map((item) =>
              <GameCard
                  homeTeam={item.homeTeam}
                  visitingTeam={item.visitingTeam}
                  winningTeam={item.winningTeam}
                  key={item.key}
              />
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SearchResultContainer;