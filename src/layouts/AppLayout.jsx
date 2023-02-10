import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

export const AppLayout = ({ children }) => {
    return (
        <Grid
            container
            sx={{
                alignContent: 'center',
                bgcolor:'#cfdae4',
                height: '100%',
                justifyContent: 'center',
                overflow: 'none',
                position:'absolute',
            }}
        >
            {children}
        </Grid>
    )
}

AppLayout.propTypes = {
    children: PropTypes.object.isRequired,
}