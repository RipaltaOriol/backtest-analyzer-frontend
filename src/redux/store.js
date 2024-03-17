import { configureStore } from "@reduxjs/toolkit";

import barGraphReducer from "features/graphs/barGraphSlice";
import lineGraphReducer from "features/graphs/lineGraphSlice";
import scatterGraphReducer from "features/graphs/scatterGraphSlice";
import tradeReducer from "features/trades/tradeSlice";

import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import messagesReducer from "../features/messages/messagesSlice";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        calendar: calendarReducer,
        messages: messagesReducer,
        note: noteReducer,
        barGraph: barGraphReducer,
        scatterGraph: scatterGraphReducer,
        lineGraph: lineGraphReducer,
        trade: tradeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
