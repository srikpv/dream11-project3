import React from "react";

function GameCard(props) {
  return (
    <tr>
      <td >{props.homeTeam}</td>
      <td >{props.visitingTeam}</td>
      <td >{props.winningTeam}</td>
   </tr>
  );
}

export default GameCard;