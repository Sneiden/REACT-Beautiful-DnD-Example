import React from 'react'
import PropTypes from 'prop-types'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

export const SpeedDialComp = ({ actions, direction="up" }) => {
    return (
        <Box sx={{ transform: 'translateZ(0px)'}}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                //sx={{ position: 'absolute', bottom: 0, right: 0}}
                icon={<SpeedDialIcon />}
                direction={direction}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        id={action.name}
                        onClick={action.handleClick}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}

SpeedDialComp.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.object.isRequired,
            name: PropTypes.string.isRequired,
            handleClick: PropTypes.func.isRequired,
        })
    ).isRequired,
    direction: PropTypes.string,
}