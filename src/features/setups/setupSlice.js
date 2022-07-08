import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  filters: [],
  data: {},
  notes: '',
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setSetup: (state, action) => {
      const setup = action.payload;
      console.log('Setup Slice')
      console.log(setup)
      state.id = setup.id;
      state.name = setup.name;
      state.data = setup.state;
      state.notes = setup.notes;
      state.filters = setup.filters;
      state.options = setup.options;
      state.status = "succeeded";
    },
    addFilter: (state, action) => {
      const setup = action.payload;

      state.filters = setup.filters;
      state.data = setup.state;
    },
    addNotes: (state, action) => {
      const setup = action.payload;

      state.notes = setup.notes;
    }
  },
});

export const { setSetup, addFilter, addNotes } = setupSlice.actions;

export const selectSetupId = (state) => state.setup.id;
export const selectSetupName = (state) => state.setup.name;
export const selectSetupData = (state) => state.setup.data;
export const selectSetupNotes = (state) => state.setup.notes;
export const selectSetupFilters = (state) => state.setup.filters;
export const selectSetupOptions = (state) => state.setup.options;

export default setupSlice.reducer;
