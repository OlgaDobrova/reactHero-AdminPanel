import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

export const fetchFilters = createAsyncThunk(
  // имя среза/тип действия (actions)
  "filters/fetchFilters",
  //ф-ция, кот вернет промис (асинхронная ф-ция, например fetch)
  () => {
    const { request } = useHttp();
    return request("http://localhost:3001/filters");
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = "idle";
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
  },
  extraReducers: (builder) => {
    builder
      // ф-ция формируется/отправляется
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      //ф-ция успешно выполнена
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
      })
      //ф-ция завершилась ошибкой
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      // default - ничего не делаем, state остается прежним
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const {
  activeFilterChanged,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} = actions;
