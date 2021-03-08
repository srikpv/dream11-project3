import React, {useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import DB from '../utils/DB';
import Players from './Players';
import "./styles/ViewPlayer.css";

 const ViewPlayer = forwardRef((props, ref) => {

    const [player_name, setPlayerName] = useState(props.player_name);
    const [player, setPlayer] = useState();
    
    useImperativeHandle(ref, () => ({
        setPlayerName,
    }));

    useEffect(() => {
        if (typeof(player_name) !== 'undefined')
            DB.getPlayerInfo(player_name)
            .then(player_data => {
                setPlayer(player_data);
                console.log(player);
            });
    }, [player_name])

    if (typeof(player) === 'undefined'){
        return <div>Click on a player to view his details</div>;
            }
    else{
    return (
        <div className="pnl490M" style={{'position' : 'relative', 'left' : '-70px'}}>
            <div className="ciPlayernametxt" style={{_width: "467px"}}>
                <div style={{margin: "0", float: "left", paddingBottom: "3px"}}>
                <h1>{player.fullName}<a href="/rss/content/story/feeds/379140.rss" id="rssIcon" style={{padding: "1px 0 0 0"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                
                    </h1>
                <h3 className="PlayersSearchLink"><b>{player.country}</b></h3>
                </div>
            </div>
            <div style={{float: "left", display: "table-cell", marginBottom: "10px", _width: "520px"}}>
                    <div style={{float: "left", width: "310px", color: "#666666", fontSize: "11px"}}>
                        <p className="ciPlayerinformationtxt"><b>Full name&nbsp;</b>
                        <span>{player.fullName}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Born&nbsp;</b>
                        <span>
                        {player.born}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Current age&nbsp;</b> <span>{player.currentAge}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Major teams&nbsp;</b> <span>{player.majorTeams}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Playing role&nbsp;</b> <span>{player.playingRole}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Batting style&nbsp;</b> <span>{player.battingStyle}</span></p>
                        <p className="ciPlayerinformationtxt"><b>Bowling style&nbsp;</b> <span>{player.bowlingStyle}</span></p>
                    </div>
                    <div style={{float: "left", marginBottom: "15px", width: "210px"}}>
                        <img src={player.imageURL} title={player.fullName} alt={player.fullName} style={{float: "right"}} border="0" />
                    </div>
            </div>

            <div style={{width: "470px", padding: "0px 0 5px 0", marginTop: "5px", clear: "both", float: "left"}}>
                <a name="bataves"></a>
                <span className="ciPhotoWidgetLink">Batting and fielding averages</span>
            </div>
            <table className="engineTable">
                <thead>
                <tr className="head">
                <th title="class name" className="left" nowrap="nowrap"><b></b></th>
                <th title="matches played" nowrap="nowrap">Mat</th>
                <th title="innings batted" nowrap="nowrap">Inns</th>
                <th title="not outs" nowrap="nowrap">NO</th>
                <th title="runs scored" nowrap="nowrap">Runs</th>
                <th title="highest inns score" className="padAst" nowrap="nowrap">HS</th>
                <th title="batting average" nowrap="nowrap">Ave</th>
                <th title="balls faced" nowrap="nowrap">BF</th>
                <th title="batting strike rate" nowrap="nowrap">SR</th>
                <th title="hundreds scored" nowrap="nowrap">100</th>
                <th title="fifties scored" nowrap="nowrap">50</th>
                <th title="boundary fours" nowrap="nowrap">4s</th>
                <th title="boundary sixes" nowrap="nowrap">6s</th>
                <th title="catches taken" nowrap="nowrap">Ct</th>
                <th title="stumpings made" nowrap="nowrap">St</th>
                </tr>
                </thead>
                <tbody>
                <tr className="data1">
                                    <td className="left" title="record rank: 1" nowrap="nowrap"><b>T20Is</b></td>
                                                    <td nowrap="nowrap">8</td>
                                                    <td nowrap="nowrap">6</td>
                                                    <td nowrap="nowrap">2</td>
                                                    <td nowrap="nowrap">275</td>
                                                    <td nowrap="nowrap">99*</td>
                                                    <td nowrap="nowrap">68.75</td>
                                                    <td nowrap="nowrap">177</td>
                                                    <td nowrap="nowrap">155.36</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">3</td>
                                                    <td nowrap="nowrap">27</td>
                                                    <td nowrap="nowrap">9</td>
                                                    <td nowrap="nowrap">5</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                <tr className="data1">
                                    <td className="left" title="record rank: 2" nowrap="nowrap"><b>First-class</b></td>
                                                    <td nowrap="nowrap">107</td>
                                                    <td nowrap="nowrap">172</td>
                                                    <td nowrap="nowrap">23</td>
                                                    <td nowrap="nowrap">7084</td>
                                                    <td nowrap="nowrap">327*</td>
                                                    <td nowrap="nowrap">47.54</td>
                                                    <td nowrap="nowrap">12605</td>
                                                    <td nowrap="nowrap">56.19</td>
                                                    <td nowrap="nowrap">18</td>
                                                    <td nowrap="nowrap">32</td>
                                                    <td nowrap="nowrap">988</td>
                                                    <td nowrap="nowrap">49</td>
                                                    <td nowrap="nowrap">94</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                <tr className="data1" data-days="737829">
                                    <td className="left" title="record rank: 3" nowrap="nowrap"><b>List A</b></td>
                                                    <td nowrap="nowrap">81</td>
                                                    <td nowrap="nowrap">78</td>
                                                    <td nowrap="nowrap">9</td>
                                                    <td nowrap="nowrap">3104</td>
                                                    <td className="padAst" nowrap="nowrap">152</td>
                                                    <td nowrap="nowrap">44.98</td>
                                                    <td nowrap="nowrap">3615</td>
                                                    <td nowrap="nowrap">85.86</td>
                                                    <td nowrap="nowrap">8</td>
                                                    <td nowrap="nowrap">18</td>
                                                    <td nowrap="nowrap">294</td>
                                                    <td nowrap="nowrap">41</td>
                                                    <td nowrap="nowrap">36</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                <tr className="data1">
                                    <td className="left" title="record rank: 4" nowrap="nowrap"><b>T20s</b></td>
                                                    <td nowrap="nowrap">88</td>
                                                    <td nowrap="nowrap">84</td>
                                                    <td nowrap="nowrap">17</td>
                                                    <td nowrap="nowrap">2951</td>
                                                    <td nowrap="nowrap">105*</td>
                                                    <td nowrap="nowrap">44.04</td>
                                                    <td nowrap="nowrap">2291</td>
                                                    <td nowrap="nowrap">128.80</td>
                                                    <td nowrap="nowrap">2</td>
                                                    <td nowrap="nowrap">22</td>
                                                    <td nowrap="nowrap">316</td>
                                                    <td nowrap="nowrap">70</td>
                                                    <td nowrap="nowrap">35</td>
                                                    <td nowrap="nowrap">1</td>
                                </tr>
                </tbody>
                </table>

                <div style={{width: "470px", padding: "0px 0 5px 0", clear: "both"}}>
                <a name="bowlaves"></a>
                <span className="ciPhotoWidgetLink">Bowling averages</span>
                </div>

                    
                <table className="engineTable">
                <thead>
                <tr className="head">
                <th title="class name" className="left" nowrap="nowrap"><b></b></th>
                <th title="matches played" nowrap="nowrap">Mat</th>
                <th title="innings bowled in" nowrap="nowrap">Inns</th>
                <th title="balls bowled" nowrap="nowrap">Balls</th>
                <th title="runs conceded" nowrap="nowrap">Runs</th>
                <th title="wickets taken" nowrap="nowrap">Wkts</th>
                <th title="best innings bowling" nowrap="nowrap">BBI</th>
                <th title="best match bowling" nowrap="nowrap">BBM</th>
                <th title="bowling average" nowrap="nowrap">Ave</th>
                <th title="economy rate" nowrap="nowrap">Econ</th>
                <th title="bowling strike rate" nowrap="nowrap">SR</th>
                <th title="four wkts in an inns" nowrap="nowrap">4w</th>
                <th title="five wkts in an inns" nowrap="nowrap">5w</th>
                <th title="ten wkts in a match" nowrap="nowrap">10</th>
                </tr>
                </thead>
                <tbody>
                <tr className="data1">
                                    <td className="left" title="record rank: 1" nowrap="nowrap"><b>T20Is</b></td>
                                                    <td nowrap="nowrap">8</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td className="padDp2" nowrap="nowrap">-</td>
                                                    <td className="padDp2" nowrap="nowrap">-</td>
                                                    <td className="padDp1" nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                                    <td nowrap="nowrap">-</td>
                                </tr>
                <tr className="data1">
                                    <td className="left" title="record rank: 2" nowrap="nowrap"><b>First-class</b></td>
                                                    <td nowrap="nowrap">107</td>
                                                    <td nowrap="nowrap">25</td>
                                                    <td nowrap="nowrap">626</td>
                                                    <td nowrap="nowrap">467</td>
                                                    <td nowrap="nowrap">9</td>
                                                    <td nowrap="nowrap">3/36</td>
                                                    <td nowrap="nowrap">4/88</td>
                                                    <td nowrap="nowrap">51.88</td>
                                                    <td nowrap="nowrap">4.47</td>
                                                    <td nowrap="nowrap">69.5</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                <tr className="data1" data-days="737829">
                                    <td className="left" title="record rank: 3" nowrap="nowrap"><b>List A</b></td>
                                                    <td nowrap="nowrap">81</td>
                                                    <td nowrap="nowrap">9</td>
                                                    <td nowrap="nowrap">128</td>
                                                    <td nowrap="nowrap">127</td>
                                                    <td nowrap="nowrap">3</td>
                                                    <td nowrap="nowrap">1/7</td>
                                                    <td nowrap="nowrap">1/7</td>
                                                    <td nowrap="nowrap">42.33</td>
                                                    <td nowrap="nowrap">5.95</td>
                                                    <td nowrap="nowrap">42.6</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                <tr className="data1">
                                    <td className="left" title="record rank: 4" nowrap="nowrap"><b>T20s</b></td>
                                                    <td nowrap="nowrap">88</td>
                                                    <td nowrap="nowrap">8</td>
                                                    <td nowrap="nowrap">103</td>
                                                    <td nowrap="nowrap">141</td>
                                                    <td nowrap="nowrap">3</td>
                                                    <td nowrap="nowrap">1/10</td>
                                                    <td nowrap="nowrap">1/10</td>
                                                    <td nowrap="nowrap">47.00</td>
                                                    <td nowrap="nowrap">8.21</td>
                                                    <td nowrap="nowrap">34.3</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                                    <td nowrap="nowrap">0</td>
                                </tr>
                </tbody>
                </table>

        </div>
    )
    }
});


export default ViewPlayer;