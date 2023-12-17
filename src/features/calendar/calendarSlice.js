import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

function stringToDate(str) {
    return dayjs(str);
}

function dateToString(date) {
    return date.toString();
}

const initialState = {
    currentDate: dayjs().toString(),
    selectedTrade: null,
    dateFormat: null,
    resultDisplay: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getToday: (state) => {
            state.currentDate = dateToString(dayjs());
        },
        increaseMonth: (state) => {
            state.currentDate = dateToString(
                stringToDate(state.currentDate).add(1, "month")
            );
        },
        decreaseMonth: (state) => {
            state.currentDate = dateToString(
                stringToDate(state.currentDate).add(-1, "month")
            );
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

export const selectCurrentDate = (state) =>
    stringToDate(state.calendar.currentDate);
export const selectMonthIndex = (state) =>
    stringToDate(state.calendar.currentDate).month();
export const selectSelectedTrade = (state) => state.calendar.selectedTrade;
export const selectDateFormat = (state) => state.calendar.dateFormat;
export const selectResultDisplay = (state) => state.calendar.resultDisplay;

export default calendarSlice.reducer;
