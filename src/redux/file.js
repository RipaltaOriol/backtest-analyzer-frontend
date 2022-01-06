import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  file: []
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    getFiles() {},
    setFiles: (state, action) => {
      const files = action.payload
      state.file = files
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  getFiles,
  setFiles
} = fileSlice.actions

export default fileSlice.reducer