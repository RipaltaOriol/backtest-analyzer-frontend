import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMetric: null,
    currentResult: null,
};

export const lineGraphSlice = createSlice({
    name: "lineGraph",
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

export const { setCurrentMetric } = lineGraphSlice.actions;

export const selectCurrentMetric = (state) => state.lineGraph.currentMetric;
export const selectCurrentResult = (state) => state.lineGraph.currentResult;

export default lineGraphSlice.reducer;
