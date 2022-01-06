import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // keep methods as template
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = 'What'
    },
    decrement: (state) => {
      state.token = 'Hello'
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    removeAuth: (state) => {
      state.token = false
    },
    getAuth() {},
    setAuth: (state, action) => {
      const authToken = action.payload.access_token
      state.token = authToken
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  getAuth,
  setAuth,
  removeAuth
} = authSlice.actions

export default authSlice.reducer