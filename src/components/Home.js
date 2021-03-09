import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DB from '../utils/DB';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function Home() {
  const classes = useStyles();
   
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const user_id = 1
    DB.getTeamsWithWins(user_id)
    .then(teams => setTeams(teams))
    }, []);

  return (
      <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total Games</TableCell>
            <TableCell align="right">Home Games</TableCell>
            <TableCell align="right">Away Games</TableCell>
            <TableCell align="right">Total Wins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.TotalGames}</TableCell>
              <TableCell align="right">{row.HomeGames}</TableCell>
              <TableCell align="right">{row.AwayGames}</TableCell>
              <TableCell align="right">{row.TotalWins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div class="row">
        </div>
    <div class="row">
            <div className='col s8'>
          </div>
            <div className='col s2'>
            <Link to="/Teams"><button class="btn waves-effect waves-light" name="action">Add Team
                <i class="material-icons right">send</i>
            </button></Link>
          </div>
          <div className='col s2'>
          <Link to="/Play"><button class="btn waves-effect waves-light" name="action">Play Game
            <i class="material-icons right">send</i>
        </button></Link>
        </div>
        </div>
    </>
  );
}