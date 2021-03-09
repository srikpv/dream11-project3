import axios from "axios";

const url = (process.env.NODE_ENV === "development" ? "" : "https://dream11-project2.herokuapp.com");
const cric_api_url_playerFinder = process.env.REACT_APP_cric_api_url_playerFinder;
const cric_api_url_playerStats = process.env.REACT_APP_cric_api_url_playerStats;

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
// Export an object containing methods we'll use for accessing the random user API
export default {
  getAllPlayers: function() {
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
  
  getPlayers: function(ids) {
    return axios
    .get(url + "/api/players/" + ids, {
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

  postNewGame : function(json_body){
    return axios
    .post(url + "api/new/team", json_body, {
      headers : myHeaders,
  })
    .then(res => res.data);
  },

  getPlayerInfo: function(player_name){
    return axios
    .get(cric_api_url_playerFinder + player_name, {
      headers : myHeaders,
    })
    .then(res => {
      const player_id = res.data.data[0].pid;
      return axios
      .get(cric_api_url_playerStats + player_id, {
        headers : myHeaders,
      })
      .then(res => {
        return res.data;
      });
    })
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
  },
  getGamesbyId: function(id) {
    return axios
    .get(url + "/api/all/games/" + id, {
      headers : myHeaders,
    })
  },
  getUsers: function() {
    return axios
    .get(url + "/api/all/users", {
      headers : myHeaders,
    })
  },
  getTeamsbyId: function(id) {
    return axios
    .get(url + "/api/all/teams/" + id, {
      headers : myHeaders,
    })
  }
};