import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DB from '../utils/DB';
import { useAuth } from "../contexts/AuthContext"



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function Home() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState({id:0, username: ""});
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    DB.getUser(currentUser.email)
    .then(user => setUser(user));
    }, []);
  useEffect(() => {
      DB.getTeamsWithWins(user.id)
      .then(teams => setTeams(teams))
      }, [user]);

  return (
      <>
      <div class="row">

      </div>
      <div class="row">
      <div className='col s2'>
          </div>
          <div className='col s8'>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Total Games</StyledTableCell>
            <StyledTableCell align="right">Home Games</StyledTableCell>
            <StyledTableCell align="right">Away Games</StyledTableCell>
            <StyledTableCell align="right">Total Wins</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.TotalGames}</StyledTableCell>
              <StyledTableCell align="right">{row.HomeGames}</StyledTableCell>
              <StyledTableCell align="right">{row.AwayGames}</StyledTableCell>
              <StyledTableCell align="right">{row.TotalWins}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
          <div className='col s2'>
          </div>
        </div>
    
    <div class="row">
        </div>
        <div class="row">
      <div className='col s2'>
          </div>
          <div className='col s8'>
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
          </div>
          <div className='col s2'>
          </div>
        </div>
    
    </>
  );
}