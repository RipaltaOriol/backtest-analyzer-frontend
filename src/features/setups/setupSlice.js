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
      console.log('Inside slice')
      console.log(setup.filters)
      state.id = setup.id;
      state.name = setup.name;
      state.data = setup.state;
      state.filters = setup.filters;
      state.options = setup.options;
      state.status = "succeeded";
    },
    addFilter: (state, action) => {
      const setup = action.payload;

      state.filters = setup.filters;
      state.data = setup.state;
    }
  },
});

export const { setSetup, addFilter } = setupSlice.actions;

export const selectSetupId = (state) => state.setup.id;
export const selectSetupName = (state) => state.setup.name;
export const selectSetupData = (state) => state.setup.data;
export const selectSetupFilters = (state) => state.setup.filters;
export const selectSetupOptions = (state) => state.setup.options;

export default setupSlice.reducer;
