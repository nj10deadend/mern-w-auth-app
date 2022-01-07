import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useState, useEffect} from 'react';

function Store () {

    const [items, setItems] = useState([]);

    function getStoreItems () {

        axios.get('http://localhost:8080/store/items')
        .then(res => {
            setItems(res.data)
        })

    }
    useEffect(getStoreItems, []);

    const eachStoreItem = items.map(eachItem => {
        return (
            <div></div>
        )
    })


    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Item</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* {renderTableCells} */}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    )
}

export default Store;