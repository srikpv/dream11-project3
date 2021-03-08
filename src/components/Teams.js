import React, { useRef } from 'react'
import Players from "./Players";
import ViewPlayer from "./ViewPlayer";
import BuildTeam from "./BuildTeam";
import DB from '../utils/DB';


export default function Teams() {
    const player_ids = useRef([]);
    const players = useRef([]);
    const buildTeamRef = useRef();
    const viewPlayerRef = useRef();

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
                <div className='col s6 DivHeight93 overflow-scroll'>
                    <Players handlePlayersChange={handlePlayersChange} handlePlayerView={handlePlayerView}/>
                </div>
                <div className='col s5'>
                    <div className='row DivHeight46'>
                        <ViewPlayer ref={viewPlayerRef}/>
                    </div>
                    <div className='row'>
                        <BuildTeam ref={buildTeamRef} players={players.current} handlePlayerDeleted={handlePlayerDeleted} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}
