import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
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
  
});

const BuildTeam = forwardRef((props, ref) => {
  const classes = useStyles();
  const [ players, setPlayersState ]  = useState(props.players);
  const team_name_ref = useRef(null);

  useImperativeHandle(ref, () => ({
      setPlayersState,
  }));

  function handleFormSubmit(event){
    event.preventDefault();
    var build_team = {};
    build_team.team = {};
    build_team.team.user_id = 1;
    build_team.team.name = team_name_ref.current.value;
    build_team.team.players = players.map(player => {
        return {"player_id" : player.id}
    });
    DB.postNewGame(build_team)
    .then(res => console.log(res));
  }

  return (
    <>
    <form onSubmit={handleFormSubmit}>
        <div class="row">
            <div className='col s9'>
          <input placeholder="Team Name" ref={team_name_ref} type="text" />
          </div>
          <div className='col s3'>
        <button class="btn waves-effect waves-light" type="submit" name="action">Create
            <i class="material-icons right">send</i>
        </button>
        </div>
        </div>
    </form>

    <div className='DivHeight35'>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow> 
        </TableHead>
        <TableBody>
        {players.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right"><i class="material-icons" style={{"cursor": "pointer"}} onClick={() => props.handlePlayerDeleted(row.id)}>delete</i></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div className="row">
        <div className="col s6"><h5>Total Players : {players.length}</h5></div>
        <div className="col s5"><h5 style={{'float': 'right'}}>Total Cost : {players.reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0)}</h5></div>
    </div>
    </>
  );
});

export default BuildTeam;