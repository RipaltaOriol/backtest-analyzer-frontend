import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  documents: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    documentCopied: {
      reducer(state, action) {
        state.documents.push(action.payload)
      },
      prepare(name) {
          return {
              payload: {
                id: nanoid(),
                name
              }
          }
      }
    }
  }
});

export const selectAllDocuments = (state) => state.documents.documents;

export const { documentCopied } = documentsSlice.actions;

export default documentsSlice.reducer;