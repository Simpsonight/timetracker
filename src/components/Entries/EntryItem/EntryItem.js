import React, { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import EntryDate from '@/components/Entries/EntryDate/EntryDate';
import { EntryContext } from '@/store/contexts/EntryContext';
import { deleteEntry } from '@/store/reducers/entryReducer';
import useStyles from './styles';

const EntryItem = ({ entryData: { date, task, project, client, description, time, id } }) => {
    const classes = useStyles();
    const { dispatch } = useContext(EntryContext);

    const handleDelete = () => {
        console.log('Delete Item:', id);
        dispatch(deleteEntry(id));
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
            <Button onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default EntryItem;
