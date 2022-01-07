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
import StoreItems from './StoreItems';

function Store () {

    const [items, setItems] = useState([]);

    async function getStoreItems () {

        await axios.get('http://localhost:8080/store/items')
        .then(res => {
            setItems(res.data)
        })

    }
    useEffect(getStoreItems, []);

    const renderEachStoreItem = items.map(eachItem => {
        return (
            <StoreItems key={eachItem._id} eachItem={eachItem}/>
        )
    })


    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Item</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderEachStoreItem}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    )
}

export default Store;