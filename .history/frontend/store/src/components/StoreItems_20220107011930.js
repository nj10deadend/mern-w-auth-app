import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import {useState} from 'react';
import axios from 'axios';

function StoreItems ({eachItem}) {

    const parsedPrice = parseFloat(eachItem.price).toFixed(2);
    return (
        <div>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {eachItem.name}
                </TableCell>
                <TableCell align="right">
                    <div>
                        <img src={eachItem.img} alt={eachItem.name} />
                        <p>ID: {eachItem._id}</p>
                    </div>
                </TableCell>
                <TableCell align="right">$ {parsedPrice}</TableCell>
                <TableCell align="right">{eachItem.category}</TableCell>
                <Button variant='contained' endIcon={<AddShoppingCartIcon />}></Button>


            </TableRow>

        </div>
    )
}

export default StoreItems;