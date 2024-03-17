import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null,
    isError: false,
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            const { msg } = action.payload;
            state.message = msg;
        },
        setError: (state, action) => {
            const { error } = action.payload;
            state.isError = error;
        },
    },
});

export const { setMessage, setError } = messagesSlice.actions;

export const selectMessage = (state) => {
    return {
        message: state.messages.message,
        isError: state.messages.isError,
    };
};

export default messagesSlice.reducer;
