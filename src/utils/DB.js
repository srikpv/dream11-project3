import axios from "axios";

//const url = "http://dream11-project2.herokuapp.com";
const url = process.env.REACT_APP_API_URL;

// Export an object containing methods we'll use for accessing the random user API
export default {
  getPlayers: function() {
    return axios
    .get("/api/all/players")
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
  }
};