import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import { CheckBox, VideoStable } from '@mui/icons-material';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Item, SpeedDialComp } from '../components';
import { startAddItem, startMoveItem } from '../store/app';
import { ComponentType } from '../helpers';

export const SortItems = () => {

    
    const { items, loading } = useSelector(state => state.items);
    const dispatch = useDispatch();
    const [countItems, setCountItems] = useState(0);

    const onClickAddItem = () => {
        dispatch(startAddItem({
            id: countItems,
            name: 'Item',
            itemType: 1,
            index: countItems,
            idItemGroup: '',
        }))
        setCountItems(countItems + 1);
    };

    const onClickAddGroup = () => {
        dispatch(startAddItem({
            id: countItems,
            name: 'Group',
            itemType: 2,
            index: countItems,
            idItemGroup: '',
            items:[],
        }))
        setCountItems(countItems + 1);
    };

    const handleDragEnd = (prop) => {
        const {destination, source, draggableId} = prop
        
        if (!destination) {
            return;
        }

        if (
            destination.draggableId === source.droppableId &&
            destination.index === source.droppableId
        ) {
            return;
        }

        dispatch(startMoveItem(source.index, destination.index, draggableId))
      }

    const actions = useMemo(() => [
        { icon: <CheckBox />, name: 'Add CheckBox', handleClick: onClickAddItem },
        { icon: <VideoStable />, name: 'Add Group', handleClick: onClickAddGroup },
    ], [onClickAddItem, onClickAddGroup]);

    return (
      <DragDropContext onDragEnd={handleDragEnd}>

        <Grid
            container
            sx={{
                bgcolor: '#DFE5E7',
                justifyContent: 'center',
                overflowY: 'auto',
                height: '100%',
                width: '60%',
            }}
        >
            <Droppable droppableId="droppable-main">
                {(provided, snapshot) => (
                    <Grid
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            bgcolor: () => (snapshot.isDraggingOver?'#C9E8E8':'#DFE5E7'),
                            m: 2,
                            width: '100%',
                        }}
                    >
                        {
                            items.map((item, index) => (
                                <ComponentType key={item.id} item={item} index={index} />
                            ))
                        }
                        {provided.placeholder}
                    </Grid>
                )}
            </Droppable>
            <Grid
                sx={{
                    position: 'absolute',
                    right: '1rem',
                    bottom: '1rem',
                }}
            >
                <SpeedDialComp actions={actions} />
            </Grid>
        </Grid>
      </DragDropContext>

    )
}
