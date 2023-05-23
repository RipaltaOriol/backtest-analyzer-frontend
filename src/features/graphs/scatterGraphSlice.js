import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMetric: null,
    currentResult: null,
};

export const scatterGraphSlice = createSlice({
    name: "scatterGraph",
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

export const { setCurrentMetric } = scatterGraphSlice.actions;

export const selectCurrentMetric = (state) => state.scatterGraph.currentMetric;
export const selectCurrentResult = (state) => state.scatterGraph.currentResult;

export default scatterGraphSlice.reducer;
