import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        textAlign: 'left',
    },

    subline: {
        margin: 0,
        color: theme.palette.grey[600],
    },
}));

export default useStyles;
