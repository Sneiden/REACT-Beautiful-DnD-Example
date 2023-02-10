import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Item } from './Item';
import { useDispatch } from 'react-redux';
import { startAddItemInGroup, startMoveItemInGroup } from '../store/app';
import { CheckBox } from '@mui/icons-material';
import { SpeedDialComp } from './SpeedDialComp';

export const Group = ({ itemGroup, index }) => {

    const { items, loading } = useSelector(state => state.items);
    const [groupItems, setGroupItems] = useState('loading')

    useEffect(() => {
        const groupItem = items.find(item => item.id === itemGroup.id)
        setGroupItems(groupItem.items)
    }, [items])

    const dispatch = useDispatch();
    const [countItems, setCountItems] = useState(0);

    const onClickAddItem = () => {
        dispatch(startAddItemInGroup({
            id: `${itemGroup.id}-${countItems}`,
            name: 'Item',
            itemType: 1,
            index: countItems,
            idItemGroup: itemGroup.id,
        },itemGroup.id))
        setCountItems(countItems + 1);
    };

    const handleDragEnd = (prop) => {
        const { destination, source, draggableId } = prop

        if (!destination) {
            return;
        }

        if (
            destination.draggableId === source.droppableId &&
            destination.index === source.droppableId
        ) {
            return;
        }

        dispatch(startMoveItemInGroup(source.index, destination.index, draggableId, itemGroup.id))
    }

    const actions = useMemo(() => [
        { icon: <CheckBox />, name: 'Add CheckBox', handleClick: onClickAddItem },
    ], [onClickAddItem]);

    return (
        <Draggable draggableId={`${itemGroup.id}`} index={index}>
            {(providedDrag, snapshotDrag) => (
                <Paper
                    ref={providedDrag.innerRef}
                    {...providedDrag.draggableProps}
                    elevation={4}
                    sx={{
                        bgcolor: () => snapshotDrag.isDragging ? '#79C6A0' : '#C0CBD0',
                        m: 1,
                        pb: 2,
                        pr: 2,
                        pl: 2,
                    }}
                >
                    <Grid
                        sx={{
                            gridTemplateAreas: `"gridLabelDrag"
                            "gridGroup"`,
                            gridTemplateColumns: 'auto',
                            gridTemplateRows: 'auto 1fr',
                            height: 'auto',
                        }}
                    >

                        <Grid
                            {...providedDrag.dragHandleProps}
                            sx={{
                                m:2,
                                display: 'grid',
                                gridArea: 'gridLabelDrag',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant='h5'
                            >
                                {`${itemGroup.name} ${itemGroup.index}`}
                            </Typography>
                        </Grid>

                        <Grid
                            sx={{
                                display: 'grid',
                                gridArea: 'gridGroup',
                            }}
                        >
                            <DragDropContext onDragEnd={handleDragEnd}>

                                <Droppable droppableId={`droppable-${itemGroup.id}`}>
                                    {(providedDrop, snapshotDrop) => (
                                        <Grid
                                            ref={providedDrop.innerRef}
                                            sx={{
                                                display: 'flex',
                                                flexDirection:'column',
                                                bgcolor: () => (snapshotDrop.isDraggingOver ? '#C9E8E8' : '#DFE5E7'),
                                                width: '100%',
                                                height: 'auto',
                                                minHeight: '100px',
                                            }}
                                            {...providedDrop.droppableProps}
                                        >
                                            {
                                                groupItems !== 'loading' &&
                                                    (groupItems.length > 0)
                                                    ?
                                                    groupItems.map((groupItem, index) => (
                                                        <Item
                                                            key={groupItem.id}
                                                            item={groupItem}
                                                            index={index}
                                                        />
                                                    ))
                                                    :
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            alignSelf: 'center',
                                                            m: 2,
                                                        }}
                                                    >
                                                        Add items
                                                    </Typography>
                                            }
                                            <Grid
                                                position='relative'
                                            >
                                                <SpeedDialComp actions={actions} direction="left" />
                                            </Grid>
                                            {providedDrop.placeholder}
                                        </Grid>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Draggable>
    )
}

Group.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            itemType: PropTypes.number.isRequired,
            index: PropTypes.number.isRequired,
            idItemGroup: PropTypes.any.isRequired,
        })
    ),
    itemGroup: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        itemType: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        idItemGroup: PropTypes.any.isRequired,
    })
}
