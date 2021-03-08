import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DB from "../utils/DB";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

var players_data = [];

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

class Players extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sort_field : "id",
            sort_order : 0,
            filter_field : "id" ,
            filter_value : "",
            data : []
        };
    }

    componentDidMount(){
        DB.getAllPlayers()
        .then(players => {
            players_data = players;
            this.setState({...this.state, data : players});
        });
    }
    
    handleSortChange = event => {
        let sort_field = event.target.getAttribute("col_id");
        let sort_order = (this.state.sort_field === sort_field ? 1-this.state.sort_order : 0);
        
        this.handleStateChange(sort_field, sort_order, this.state.filter_field, this.state.filter_value);
    }

    handleFilterChange = event => {
        let filter_field = event.target.getAttribute("col_id");
        let filter_value = (filter_field === "id" || filter_field === "cost" ? parseInt(event.target.value) : event.target.value);
        filter_value = ((filter_field === "id" || filter_field === "cost") && isNaN(filter_value) ? "" : filter_value);

        this.handleStateChange(this.state.sort_field, this.state.sort_order, filter_field, filter_value);
    }

    getClassName = field_name => {
        return this.state.sort_field!==field_name?"":0===this.state.sort_order?"headerSortUp":"headerSortDown";
    }

    handleStateChange = (sort_field, sort_order, filter_field, filter_value) => {
        this.setState({
            sort_field:sort_field,
            sort_order:sort_order,
            filter_field:filter_field,
            filter_value:filter_value,
            //data:User_Data.filter(element => (element[filter_field] === (filter_value === "" ? element[filter_field] : filter_value)) || !(element[filter_field].toString().toLowerCase().search(filter_value.toString().toLowerCase())) ).sort(this.sortByProperty(sort_field, sort_order))
            data: players_data.filter(element => (element[filter_field] === (filter_value === "" ? element[filter_field] : filter_value)) || !(filter_field === "id" || filter_field === "cost" || element[filter_field].toLowerCase().search(filter_value.toLowerCase())) ).sort(this.sortByProperty(sort_field, sort_order))
        });
    }
    
    sortByProperty=(property, sort_order) => {  
        return function(a,b){  
           return (a[property] > b[property] ? (sort_order===0 ? 1 : -1) : (sort_order===0 ? -1 : 1));  
        }  
     }


    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell className={this.getClassName("id")} align="right" onClick={this.handleSortChange} col_id="id">ID</StyledTableCell>
                        <StyledTableCell className={this.getClassName("name")} onClick={this.handleSortChange} col_id="name">Name</StyledTableCell>
                        <StyledTableCell className={this.getClassName("country")} onClick={this.handleSortChange} col_id="country">Country</StyledTableCell>
                        <StyledTableCell className={this.getClassName("dob")} align="right" onClick={this.handleSortChange} col_id="dob">Date of Birth</StyledTableCell>
                        <StyledTableCell className={this.getClassName("cost")} align="right" onClick={this.handleSortChange} col_id="cost">Cost</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <StyledTableCell align="right" style={{width: 70}}><input type="number" onChange={this.handleFilterChange} col_id="id" /></StyledTableCell>
                        <StyledTableCell><input type="text" onChange={this.handleFilterChange} col_id="name" /></StyledTableCell>
                        <StyledTableCell><input type="text" onChange={this.handleFilterChange} col_id="country" /></StyledTableCell>
                        <StyledTableCell align="right"><input type="text" onChange={this.handleFilterChange} col_id="dob" /></StyledTableCell>
                        <StyledTableCell align="right"><input type="number" onChange={this.handleFilterChange} col_id="cost" /></StyledTableCell>
                    </TableRow>
                    {this.state.data.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row" align="left" >
                            <FormControlLabel
                                control={<Checkbox onChange={this.props.handlePlayersChange} inputProps={{ 'player_id': row.id }} />}
                                label={row.id}
                            />
                        </StyledTableCell>
                        <StyledTableCell><span style={{"cursor": "pointer"}} onClick={() => this.props.handlePlayerView(row.name)}>{row.name}</span></StyledTableCell>
                        <StyledTableCell>{row.country}</StyledTableCell>
                        <StyledTableCell align="right">{row.dob}</StyledTableCell>
                        <StyledTableCell align="right">{row.cost}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            );
  }

}



export default Players;