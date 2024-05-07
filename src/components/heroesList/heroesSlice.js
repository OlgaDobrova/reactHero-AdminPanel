import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // Здесь используется мутация, т.к. работает библиотека immer.js
    // она сохраняет иммутабельность - неизменность после создания
    // при конструкции
    // (state) => {
    //   state.heroesLoadingStatus = "loading";
    // }
    // библиотека выполняет
    //  {
    //     ...state,
    //     heroesLoadingStatus: "loading",
    //   }
    // т.е. берет старый state и меняет в нем 1 св-во. В итоге - новая ссылка на обновленный state

    // Причем, если в ф-ции будет return, то библиотека не подключится! решит, что мы сами учли принципы иммутабельности
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroesCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroesDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;
export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesCreated,
  heroesDeleted,
} = actions;
