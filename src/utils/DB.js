import axios from "axios";

const url = (process.env.NODE_ENV === "development" ? "" : "https://dream11-project2.herokuapp.com");
//const url = process.env.REACT_APP_API_URL;
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
// Export an object containing methods we'll use for accessing the random user API
export default {
  getPlayers: function() {
    return axios
    .get(url + "/api/all/players", {
        headers : myHeaders,
    })
      .then(res => {
        const players = res.data.players;
        return players.map(player => {
          return {
            id : player.id,
            name : player.name,
            country : player.country,
            dob : player.dob,
            cost : player.cost
          }
        });
      });
  },
  getTeams: function() {
    return axios
    .get(url + "/api/all/teams", {
      headers : myHeaders,
    })
    .then(res => {
      console.log ("return", res);
      return res;
    })
  },
  putNewGame: function(data) {
    console.log ("api call ", data);
    return axios
    .put(url + "/api/new/game", data);
  },
  getGame: function(id) {
    return axios
    .get(url + "/api/game/"+id, {
      headers : myHeaders,
    })
  }
};