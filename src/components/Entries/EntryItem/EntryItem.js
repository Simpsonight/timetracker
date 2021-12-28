import React, { useContext, useState } from 'react';
import { Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EntryDate from '@/components/Entries/EntryDate/EntryDate';
import { EntryContext } from '@/store/contexts/EntryContext';
import { deleteEntry } from '@/store/reducers/entryReducer';
import useStyles from './styles';

const EntryItem = ({ entryData: { date, task, project, client, description, time, id } }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { dispatch } = useContext(EntryContext);

    const handleDelete = () => {
        dispatch(deleteEntry(id));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <EntryDate date={new Date(date)} />
            <div>
                <Typography variant='h4' component='p'>
                    {task}
                </Typography>
                <p className={classes.subline}>
                    {client} <span>|</span> {project}
                </p>
            </div>
            <Typography variant='h4' component='p'>
                {time} h
            </Typography>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>{'Delete Entry'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>Should the entry really be deleted?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EntryItem;
