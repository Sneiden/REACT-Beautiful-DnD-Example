import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./app";

export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
    },
})