import { configureStore } from "@reduxjs/toolkit";

import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";

// enhancer может дополнять любую ф-цию store
// middelware дополняет только dispatch

// указанные аргументы ф-ций идут по умолчанию, но мы их можем не указывать, раскрывать как объекты или переименовывать
// const stribgMiddelware = (store) => (dispatch) => (action) => {
// т.е. в первой ф-ции не указан аргумент store, во второй переименован аргумент dispatch
const stribgMiddelware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware().concat(stribgMiddelware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
