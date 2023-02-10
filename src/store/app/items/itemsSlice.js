import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [
            // {
            //     id: 1,
            //     name: 'item',
            //     itemType: 1, //Item
            //     index: 0,
            //     idItemGroup: ''
            // },
            // {
            //     id: 2,
            //     name: 'group',
            //     itemType: 2, //Group
            //     index: 1,
            //     idItemGroup: ''
            //     items: [
            //          {
            //              id: 2-1,
            //              name: 'item',
            //              itemType: 1, //Item
            //              index: 0,
            //              idItemGroup: ''
            //          },
            //          {
            //              id: 2-1,
            //              name: 'item',
            //              itemType: 1, //Item
            //              index: 0,
            //              idItemGroup: ''
            //          },
            //     ]
            // },
            // {
            //     id: 3,
            //     name: 'item',
            //     itemType: 1, //Group
            //     index: 3,
            //     idItemGroup: ''
            // },
        ],
        loading: true,
    },

    reducers: {
        //payload = objeto item
        addItem: (state, { payload }) => {
            state.items.push(payload);
        },
        //payload = objeto item, idItemGroup
        addItemInGroup: (state, { payload }) => {
            const itemMovedIndex = state.items.findIndex(item => `${item.id}` === `${payload.idItemGroup}`);
            state.items[itemMovedIndex].items.push(payload.item);
        },
        //payload = object {source , destination, idItem}
        moveItem: (state, { payload }) => {
            const itemMoved = state.items.find(item => `${item.id}` === payload.idItem);
            state.items.splice(payload.source, 1);
            state.items.splice(payload.destination, 0, { ...itemMoved })
        },
        //payload = object {source , destination, idItem, idItemGroup}
        moveItemInGroup: (state, { payload }) => {
            const itemMovedIndex = state.items.findIndex(item => `${item.id}` === `${payload.idItemGroup}`);
            const itemMoved = state.items[itemMovedIndex].items.find(item => `${item.id}` === payload.idItem);
            state.items[itemMovedIndex].items.splice(payload.source, 1);
            state.items[itemMovedIndex].items.splice(payload.destination, 0, { ...itemMoved })
        },

    }
});

export const { addItem, addItemInGroup, moveItemInGroup, moveItem } = itemsSlice.actions;