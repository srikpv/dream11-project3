import React, { useEffect, useState } from "react";
import "./Play.css";
import DB from "../utils/DB";

function Play() {
    /* Pick teams to play a new game */
    const [gameTeams, setGameTeams] = useState({
        teams:[],
        homeTeam: "",
        oppTeam: ""
    });
    const [gameData, setGameData] = useState({
        gameId:"",
        winningTeamName:"",
        homeTeamTotal:"",
        oppTeamTotal:"",
        game: ""
    });

    useEffect(() => {
        loadTeams();
    }, []);

    useEffect(() => {
        loadGameData();
    }, [gameData.gameId]);

    function getTeamName(teamId) {
        /* set the winning team name from team id */
        let teamName = "";
        if (gameTeams.teams.length) {
            console.log ("find team name for team ",teamId);
            const team = gameTeams.teams.find( ({ id }) => id == teamId );
            console.log ("team is ",team);
            if (team) {teamName = team.name};
            return teamName;
        }
    };

    function loadTeams() {
        console.log("call server API to get team");
        DB.getTeams()
        .then(res => {
            console.log ("team call return ", res.data.teams);
            setGameTeams({
                teams:res.data.teams,
                homeTeam:"",
                oppTeam:""
            });
            }
        )
        .catch(err => console.log(err));  
    };

    function handlePlayGame(event) {
        /* handle when user selects 2 teams to play a game */
        event.preventDefault();
        DB.putNewGame({
            home_team_id:gameTeams.homeTeam,
            opp_team_id:gameTeams.oppTeam
        })
        .then(res => {
            console.log ("game id returned ",res.data.game.id);
            setGameData({...gameData,gameId:res.data.game.id});
        })
        .then(() => {
            console.log ("reset game teams");
            setGameTeams({...gameTeams,
            homeTeam: "",
            oppTeam: ""
            });
            console.log ("reset game teams after ", gameTeams);
        })
        .catch(err => console.log(err));
    };

    function loadGameData() {
        console.log ("loading game data for game ",gameData.gameId);
        if (gameData.gameId) {
            DB.getGame(gameData.gameId)
                .then(res => {
                    console.log("new game data ",res.data.game);
                    let winningTeam = getTeamName(res.data.game.win_team_id);
                    let homeTotal = 0;
                    res.data.game.home_team_players.forEach (function (val) {
                        homeTotal +=val.score;
                    })
                    let oppTotal = 0;
                    res.data.game.opp_team_players.forEach (function (val) {
                        oppTotal +=val.score;
                    })
                    setGameData({...gameData, winningTeamName:winningTeam, homeTeamTotal:homeTotal, oppTeamTotal:oppTotal, game:res.data.game});
                    console.log("set game data ",gameData);
                    }
                )
                .catch(err => console.log(err));
        }
        else {
            console.log("no game played yet");
        }
    };

    function isHomeTeam(rowId) {
        if (rowId === gameTeams.homeTeam)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    function isOppTeam(rowId) {
        if (rowId === gameTeams.oppTeam)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

return (  
    <div className="row">
        <div className="col s6">
        <h5> Select 2 teams to play a game</h5>
        <form onSubmit={handlePlayGame}>
            {gameTeams.teams.length ? (
                <div className="row">
                <ul>
                {gameTeams.teams.map(item => {
                    return (
                        <div className="row">
                            <div className="col s6">
                                <span>{item.name}</span>
                            </div>
                            <div className="col s2">
                                <label  className="homeTxt-check-space">
                                <input class="with-gap" type="radio" name="hometeam" className="home-check-space"
                                value={item._id}
                                checked={isHomeTeam(item.id)}
                                onClick={e => setGameTeams({...gameTeams,homeTeam:item.id})}/>
                                <span>Home </span>
                                </label>
                            </div>

                            <div className="col s2">
                                <label  className="oppTxt-check-space">
                                <input class="with-gap" type="radio" name="oppoteam" className="opp-check-space"
                                value={item._id}
                                checked={isOppTeam(item.id)}
                                onClick={e => setGameTeams({...gameTeams,oppTeam:item.id})}/>
                                <span> Opp </span>
                                </label>
                            </div>
                        </div>
                    )
                })}
                </ul>
                </div>
            ) : (
                <h6> Build teams to play</h6>
            )}
            
            <button class="btn waves-effect waves-light" name="action">Play Game
                <i class="material-icons right">send</i>
            </button>
        </form>
        </div>
        <div className="row">
        <div className="col s6">
            <h5> Game Results </h5>
            <h5> {gameData.winningTeamName} Wins! </h5>
            {(gameData.gameId && gameData.game) ? (
                <div className="row">        
                    <div className="col s6 m6 I6">
                        <h5> Home Team </h5>
                        <h5> {getTeamName(gameData.home_team_id)} </h5>
                    {gameData.game.home_team_players.length ? (
                    <ul>
                        {gameData.game.home_team_players.map(item => {
                        return (
                            <div className="column">
                                <li>{item.player.name} {item.score}
                                </li>
                            </div>
                        )
                        })}
                    </ul> ) : (
                        <h6> No home team data </h6>
                    )}
                    <h5> Total Score {gameData.homeTeamTotal}</h5>
                    </div>
                    
                    <div className="col s6 m6 I6">
                    <h5> Opposing Team </h5>
                    <h5> {getTeamName(gameData.opp_team_id)} </h5>
                    {gameData.game.opp_team_players.length ? (
                    <ul>
                        {gameData.game.opp_team_players.map(item => {
                        return (
                            <div className="column">
                                <li>{item.player.name} {item.score}
                                </li>
                            </div>
                        )
                        })}
                    </ul>) : (
                        <h6> No opposing team data </h6>
                    )}
                    <h5> Total Score {gameData.oppTeamTotal}</h5>
                    </div>
                    </div>
                ) : (
                    <h6> Click on Play Game to see a game results </h6>
                )}
        </div>               
    </div>
    </div>
);
}

export default Play;