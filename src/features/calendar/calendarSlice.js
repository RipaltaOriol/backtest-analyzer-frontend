import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    currentDate: dayjs(),
    selectedTrade: null,
    dateFormat: null,
    resultDisplay: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getToday: (state) => {
            state.currentDate = dayjs();
        },
        increaseMonth: (state) => {
            state.currentDate = state.currentDate.add(1, "month");
        },
        decreaseMonth: (state) => {
            state.currentDate = state.currentDate.add(-1, "month");
        },
        setSelectedTrade: (state, action) => {
            const { trade } = action.payload;
            state.selectedTrade = trade;
        },
        deselectTrade: (state) => {
            state.selectedTrade = null;
        },
        setDateFormat: (state, action) => {
            const { dateFormat } = action.payload;
            state.dateFormat = dateFormat;
        },
        setResultDisplay: (state, action) => {
            const { resultDisplay } = action.payload;
            state.resultDisplay = resultDisplay;
        },
    },
});

export const {
    getToday,
    increaseMonth,
    decreaseMonth,
    setSelectedTrade,
    deselectTrade,
    setDateFormat,
    setResultDisplay,
} = calendarSlice.actions;

export const selectCurrentDate = (state) => state.calendar.currentDate;
export const selectMonthIndex = (state) => state.calendar.currentDate.month();
export const selectSelectedTrade = (state) => state.calendar.selectedTrade;
export const selectDateFormat = (state) => state.calendar.dateFormat;
export const selectResultDisplay = (state) => state.calendar.resultDisplay;

export default calendarSlice.reducer;
