import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMetric: null,
    currentResult: null,
};

export const barGraphSlice = createSlice({
    name: "barGraph",
    initialState,
    reducers: {
        setCurrentMetric: (state, action) => {
            const { currentMetric } = action.payload;
            state.currentMetric = currentMetric;
        },
        setCurrentResult: (state, action) => {
            const { currentResult } = action.payload;
            state.currentResult = currentResult;
        },
    },
});

export const { setCurrentMetric } = barGraphSlice.actions;

export const selectCurrentMetric = (state) => state.barGraph.currentMetric;
export const selectCurrentResult = (state) => state.barGraph.currentResult;

export default barGraphSlice.reducer;
