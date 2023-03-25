import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noteContent: "",
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        setNoteContent: (state, action) => {
            const { note } = action.payload;
            state.noteContent = note;
        },
    },
});

export const { setNoteContent } = noteSlice.actions;

export const selectNoteContent = (state) => state.note.noteContent;

export default noteSlice.reducer;
