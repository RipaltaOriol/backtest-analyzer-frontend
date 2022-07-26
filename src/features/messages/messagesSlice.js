import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginMsg: ''
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setLoginMsg: (state, action) => {
            const { msg } = action.payload;
            state.loginMsg = msg;
        }
    }
});

export const { setLoginMsg } = messagesSlice.actions;

export const selectLoginMsg = (state) => state.messages.loginMsg;

export default messagesSlice.reducer;