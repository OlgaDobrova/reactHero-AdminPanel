import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//   filters: [],
//   filtersLoadingStatus: "idle",
//   activeFilter: "all",
// };

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: "idle",
  activeFilter: "all",
});

export const fetchFilters = createAsyncThunk(
  // имя среза/тип действия (actions)
  "filters/fetchFilters",
  //ф-ция, кот вернет промис (асинхронная ф-ция, например fetch)
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
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
        // state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
        filtersAdapter.setAll(state, action.payload);
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

export const { selectAll } = filtersAdapter.getSelectors(
  (state) => state.filters
);
export const { activeFilterChanged } = actions;
