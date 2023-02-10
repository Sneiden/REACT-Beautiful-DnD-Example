import { addItem, addItemInGroup, moveItem, moveItemInGroup } from "./itemsSlice";

export const startAddItem = (item) => {
    return async (dispatch,getState) => {
        // const { items, loading } = getState().items;
        dispatch(addItem(item));
    }
}

export const startAddItemInGroup = (item, idItemGroup) => {
    return async (dispatch,getState) => {
        // const { items, loading } = getState().items;
        dispatch(addItemInGroup({item, idItemGroup}));
    }
}

export const startMoveItem = (source, destination, idItem) => {
    return async (dispatch,getState) => {
        // const { items, loading } = getState().items;
        dispatch(moveItem({source, destination, idItem}));
    }
}

export const startMoveItemInGroup = (source, destination, idItem, idItemGroup) => {
    return async (dispatch,getState) => {
        // const { items, loading } = getState().items;
        dispatch(moveItemInGroup({source, destination, idItem, idItemGroup}));
    }
}