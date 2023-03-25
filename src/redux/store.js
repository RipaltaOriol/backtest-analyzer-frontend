import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import messagesReducer from "../features/messages/messagesSlice";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        messages: messagesReducer,
        note: noteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
