import React, { useRef, useState, useEffect } from 'react'
import Players from "./Players";
import ViewPlayer from "./ViewPlayer";
import BuildTeam from "./BuildTeam";
import DB from '../utils/DB';
import { useAuth } from "../contexts/AuthContext"


export default function Teams() {
    const player_ids = useRef([]);
    const players = useRef([]);
    const buildTeamRef = useRef();
    const viewPlayerRef = useRef();
    const { currentUser, logout } = useAuth();
    const [user, setUser] = useState({id:0, username: ""});

    useEffect(() => {
        DB.getUser(currentUser.email)
          .then(user => setUser(user));
      }, []);

    function handlePlayersChange(event){
        if(event.target.checked)
            player_ids.current.push(event.target.getAttribute("player_id"));
        else
            player_ids.current = player_ids.current.filter(id => id !== event.target.getAttribute("player_id"));
        getPlayers();
    }
    
    function handlePlayerDeleted(player_id){
        player_ids.current = player_ids.current.filter(id => id.toString() !== player_id.toString());
        getPlayers();
    }

    function handlePlayerView(player_name){
        viewPlayerRef.current.setPlayerName(player_name);
    }

    function getPlayers(){
        DB.getPlayers(player_ids.current.join(','))
            .then(players => {
                players.current = players;
                buildTeamRef.current.setPlayersState(players.current);
            });
    }

    
    return (
        <div className='container-xl'>
            <div className='row'>
                <div className='col s5 DivHeight92 overflow-scroll'>
                    <Players handlePlayersChange={handlePlayersChange} handlePlayerView={handlePlayerView} user={user}/>
                </div>
                <div className='col s6'>
                    <div className='row DivHeight42'>
                        <ViewPlayer ref={viewPlayerRef} user={user}/>
                    </div>
                    <div className='row'>
                        <BuildTeam ref={buildTeamRef} players={players.current} handlePlayerDeleted={handlePlayerDeleted}  user={user}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
