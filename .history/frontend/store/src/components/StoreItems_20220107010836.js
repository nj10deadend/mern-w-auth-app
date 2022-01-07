import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react';
import axios from 'axios';

function StoreItems ({eachItem}) {
    return (
        <div>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

            </TableRow>

        </div>
    )
}

export default StoreItems;