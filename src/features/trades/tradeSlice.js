import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trade: {},
    open: false,
};

export const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        setTrade: (state, action) => {
            const trade = action.payload;
            state.trade = trade;
        },
        setOpen: (state, action) => {
            const open = action.payload;
            state.open = open;
        },
    },
});

export const { setTrade, setOpen } = tradeSlice.actions;

export const selectTrade = (state) => {
    return state.trade.trade;
};

export const selectOpen = (state) => {
    return state.trade.open;
};

export default tradeSlice.reducer;
