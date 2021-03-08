import React, { Component } from "react";
import GameCard from "./GameCard";
import DropDown from "./DropDown";
// import API from "../utils/API";
import DB from "../utils/DB";
// import "../styles/Result.css";

class SearchResultContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: [],
      home_team_id: "1",
      userId: "1",
      team: [],
      user: [],
    }; 
  } 

  componentDidMount() {
    DB.getGamesbyId(this.state.home_team_id)
        //   API.search(this.state.home_team_id)
      .then(res => {
        console.log(res)
        this.setState({
          result: res.data.games.map((e, i) => ({
            homeTeam: e.home_team.name,
            visitingTeam: e.opp_team.name,
            winningTeam: ( e.home_team_id === e.win_team_id ? e.home_team.name : e.opp_team.name ),
            key: i
          }))
        })     
      })
      .catch(err => console.log(err));

    //   API.user()
    DB.getUsers()
      .then(res => {
        console.log(res)
        this.setState({
            user: res.data.users.map( e => ({
            name: e.username,
            id: e.id            
          }))          
        })
        console.log(this.state.user)     
      })
      .catch(err => console.log(err));
  };

  getTeams(userId) {
    // API.team(userId)
    DB.getTeamsbyId(userId)
    .then(res => {
      console.log(res)
      this.setState({          
        team: res.data.teams.map( e => ({
          name: e.name,
          id: e.id            
        }))          
      })
      // console.log("xxxxxxxxx")
      // console.log(this.state.team)     
    })
    .catch(err => console.log(err));
  }

  getGames(team_id) {
    // API.search(team_id)
    DB.getGamesbyId(team_id)
      .then(res => {
        // console.log(res)
        this.setState({
          result: res.data.games.map((e, i) => ({
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
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);
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

  render() {
    let Team_Drop_Down;
    if (true) {      
      Team_Drop_Down = <div className="row">
            Team Name:
            <div className="dropdown">
            <DropDown options = {this.state.team} handleInputChange={this.handleInputChange} type="home_team_id">      
              </DropDown>
            </div>
          </div>
    }
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
            <DropDown options = {this.state.user} handleInputChange={this.handleInputChange} type="userId">      
            </DropDown>
          </div>
        </div>        
        {/* <div className="row">
          Team Name:
          <div className="dropdown">
          <DropDown options = {this.state.team} handleInputChange={this.handleInputChange}>      
            </DropDown>
          </div>
        </div> */}
        {Team_Drop_Down}
        <div className="row">
          <table className="table">
            <tbody>
                <tr>
                    <th scope="col">Home Team</th>
                    <th>Visiting Team</th>
                    <th scope="col">Winning Team </th>
                </tr>
                {[...this.state.result].map((item) =>
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
