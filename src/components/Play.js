import React, { useEffect, useState } from "react";
import "./Play.css";
import DB from "../utils/DB";

function Play() {
    // Pick teams to play a new game
    const [teams, setTeams] = useState(
        []);
    const [gameTeams, setGameTeams] = useState({
        homeTeam: "",
        oppTeam: ""
    });
    const [gameData, setGameData] = useState({
        gameId: 40,
        game: ""
    });

    useEffect(() => {
        loadTeams()
        loadGameData()
    }, []);

    function loadTeams() {
        console.log("call server API to get team");
        DB.getTeams()
        .then(res => {
            console.log ("team call return ", res.data.teams);
            setTeams(res.data.teams);
            }
        )
        .catch(err => console.log(err));  
    };

    function handlePlayGame(event) {
        event.preventDefault();
        DB.putNewGame({
            home_team_id:gameTeams.homeTeam,
            opp_team_id:gameTeams.oppTeam
        })
        .then(res => {
            console.log ("game id returned ",res.data.game.id);
            setGameData({
                gameId:res.data.game.id,
                game: ""
            });
            console.log("gameData ",gameData);
        })
        .then(() => {
            console.log ("reset game teams");
            setGameTeams({
            homeTeam: "",
            oppTeam: ""
            });
        })
        .then(() => loadGameData())
        .catch(err => console.log(err));
    };

    function loadGameData() {
        console.log ("loading game data for game ",gameData.gameId);
        (gameData.gameId ? (
            DB.getGame(gameData.gameId)
                .then(res => {
                    console.log("new garem data ",res.data.game);
                    setGameData({...gameData,game:res.data.game});
                    }
                )
                .catch(err => console.log(err))
            ) : ( 
            console.log("no game played yet")
            )             
        );
    }

return (
    
    <div className="row">
        <div className="col-sm-4">
        <h5> Select 2 teams to play a game</h5>
        <form onSubmit={handlePlayGame}>
            {teams.length ? (
                <div className="row">
                <ul>
                {teams.map(item => {
                    return (
                        <div className="column">
                            <li key={item._id}>
                            <label>{item.name}
                            <input type="checkbox" id="hometeam" className="home-check-space"
                                value={item._id}
                            onChange={e => setGameTeams({...gameTeams,homeTeam:item.id})}/>
                            <label  className="homeTxt-check-space"> Home </label>
                            
                            <input type="checkbox" id="oppteam" className="opp-check-space"
                                value={item._id}
                            onChange={e => setGameTeams({...gameTeams,oppTeam:item.id})}/>
                            <label  className="oppTxt-check-space"> Opp </label>
                            </label>
                            
                        </li>
                        </div>
                    )
                })}
                </ul>
                </div>
            ) : (
                <h6> Build teams to play</h6>
            )}
            <button className="btn btn-play" className="btn-play" type="submit">
                Play Game
            </button>
        </form>
        </div>

        <div className="col-sm-8">
            <h5> Game Results </h5>
            {(gameData.gameId && gameData.game) ? (
                <div className="row">
                    <h3> Team {gameData.game.win_team_id} Wins! </h3>
                    <div className="col-lg-4">
                        <h5> Home Team </h5>
                    {gameData.game.home_team_players.length ? (
                    <ul>
                        {gameData.game.home_team_players.map(item => {
                        return (
                            <div className="column">
                                <li> {item.player_id} {item.player.name} {item.score}
                                </li>
                            </div>
                        )
                        })}
                    </ul> ) : (
                        <h6> No home team data </h6>
                    )}
                    </div>
                    <div className="col-lg-4">
                    <h5> Opposing Team </h5>
                    {gameData.game.opp_team_players.length ? (
                    <ul>
                        {gameData.game.opp_team_players.map(item => {
                        return (
                            <div className="column">
                                <li> {item.player_id} {item.player.name} {item.score}
                                </li>
                            </div>
                        )
                        })}
                    </ul>) : (
                        <h6> No opposing team data </h6>
                    )}
                    </div>
                    </div>
                ) : (
                    <h6> Click on Play Game to see a game results </h6>
                )}
        </div>               
    </div>
    
);
}

export default Play;