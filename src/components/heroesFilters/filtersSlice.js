import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  activeFilter: "all",
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export default filtersSlice.reducer;

export const { activeFilterChanged } = filtersSlice.actions;
