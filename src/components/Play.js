import React, { useEffect, useState } from "react";
import DB from "../utils/DB";
import { useAuth } from "../contexts/AuthContext"


function Play() {
    /* Pick teams to play a new game */
    const [homeTeams, setHomeTeams] = useState([]);

    const [gameTeams, setGameTeams] = useState({
        teams:[],
        homeTeam: 0,
        oppTeam: 0
    });

    const [gameData, setGameData] = useState({
        gameId:0,
        winningTeamName:"",
        homeTeamName:"",
        oppTeamName:"",
        homeTeamTotal:0,
        oppTeamTotal:0,
        game: ""
    });

    const { currentUser, logout } = useAuth();
    const [user, setUser] = useState({id:0, username: ""});

    useEffect(() => {
        DB.getUser(currentUser.email)
          .then(user => setUser(user));
    }, []);

    useEffect(() => {
           DB.getTeamsWithWins(user.id)
        .then(teams => setHomeTeams(teams))
    }, [user]);
  
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
            setGameTeams({...gameTeams,
            homeTeam: "",
            oppTeam: ""
            });
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
                    let homeTeam = getTeamName(res.data.game.home_team_id);
                    let oppTeam = getTeamName(res.data.game.opp_team_id);
                    let homeTotal = 0;
                    res.data.game.home_team_players.forEach (function (val) {
                        homeTotal +=val.score;
                    })
                    let oppTotal = 0;
                    res.data.game.opp_team_players.forEach (function (val) {
                        oppTotal +=val.score;
                    })
                    setGameData({...gameData, winningTeamName:winningTeam, homeTeamName:homeTeam, homeTeamTotal:homeTotal, oppTeamName:oppTeam, oppTeamTotal:oppTotal, game:res.data.game});
                    console.log("set game data ",gameData);
                    }
                )
                .catch(err => console.log(err));
        }
        else {
            console.log("no game played yet");
        }
    };

    function isHomeTeams(rowId) {
        var a = false;
        homeTeams.forEach (function (team) {
            if (team.id == rowId) {a=true;} else {};    
        });        
        return a;
    };

    function homeTeamButton(item) {
        if (isHomeTeams(item.id)) {
            return <span > Home </span>
        }
        else {
        }
    };

    function oppTeamButton(item) {
        if (isHomeTeams(item.id)) {
        }
        else {
            return <span > Visitor </span>
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
                                <span>{ item.name}</span>
                            </div>
                            <div className="col s2">
                                <label  className="homeTxt-check-space">
                                <input class="with-gap" type="radio" name="hometeam" className="home-check-space" value={item._id} checked={isHomeTeam(item.id)} onClick={e => setGameTeams({...gameTeams,homeTeam:item.id})}/>
                                {homeTeamButton(item)}
                                </label>
                            </div>

                            <div className="col s2">
                                <label  className="oppTxt-check-space">
                                <input class="with-gap" type="radio" name="oppoteam" className="opp-check-space"
                                value={item._id}
                                checked={isOppTeam(item.id)}
                                onClick={e => setGameTeams({...gameTeams,oppTeam:item.id})}/>
                                {oppTeamButton(item)}
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
                    <h5> {gameData.homeTeamName} </h5>
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
                    <h5> {gameData.oppTeamName} </h5>
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
                        <h6> No visiting team data </h6>
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
