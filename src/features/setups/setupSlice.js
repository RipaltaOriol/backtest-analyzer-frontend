import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  filters: [],
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setSetup: (state, action) => {
      const setup = action.payload;
      // console.log(setup)
      state.id = setup.id;
      state.name = setup.name;
      state.filters = setup.filters;
      state.data = setup.state;
      state.status = "succeeded";
    },
  },
});

export const { setSetup } = setupSlice.actions;

export const selectSetupId = (state) => state.setup.id;
export const selectSetupName = (state) => state.setup.name;
export const selectSetupFilters = (state) => state.setup.filters;
export const selectSetupData = (state) => state.setup.data;

export default setupSlice.reducer;
