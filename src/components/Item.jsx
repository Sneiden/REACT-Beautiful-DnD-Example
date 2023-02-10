import PropTypes from 'prop-types';

import { Grid, Paper, Typography } from '@mui/material';
import { CheckBox, DragIndicator } from '@mui/icons-material';

import { Draggable } from 'react-beautiful-dnd';

export const Item = ({ item, index }) => {

    return (
        <Draggable draggableId={`${item.id}`} index={index}>
            {(provided, snapshot) => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    elevation={4}
                    sx={{
                        alignContent: 'center',
                        bgcolor: ()=>snapshot.isDragging?'#79C6A0':'#C0CBD0',
                        justifyContent: 'center',
                        m: 1,
                    }}
                >
                    <Grid
                        item
                        sx={{
                            p: 2,
                            alignItems: 'center',
                            display: 'grid',
                            gridTemplateAreas: `"gridDnD gridLabel gridIcon"`,
                            gridTemplateColumns: 'auto 1fr auto',
                            gridTemplateRows: 'auto',
                            height: 'auto',
                            justifyItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Grid
                            item
                            {...provided.dragHandleProps}
                            sx={{ display: 'flex', gridArea: 'gridDnD' }}
                        >
                            <DragIndicator sx={{ fontSize: '50px' }} />
                        </Grid>

                        <Grid
                            item
                            sx={{ display: 'flex', gridArea: 'gridLabel' }}
                        >
                            <Typography variant='h4'>{`${item.name} ${item.index}`}</Typography>
                        </Grid>

                        <Grid
                            item
                            sx={{ display: 'flex', gridArea: 'gridIcon' }}
                        >
                            <CheckBox sx={{ fontSize: '50px' }} />
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Draggable >
    )
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        itemType: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        idItemGroup: PropTypes.any.isRequired,
    }),
    index: PropTypes.number.isRequired,
}