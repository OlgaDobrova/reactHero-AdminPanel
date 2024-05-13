import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

//ф-ция createEntityAdapter() возвращает объект со свойствами, методами и колбэками, мемоизированными селекторами (ф-циями, еот помогают вытащить кусочек store)
const heroesAdapter = createEntityAdapter();

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk(
  // имя среза/тип действия (actions)
  "heroes/fetchHeroes",
  //ф-ция, кот вернет промис (асинхронная ф-ция, например fetch)
  () => {
    const { request } = useHttp();
    return request("http://localhost:3001/heroes");
  }
);

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

    heroesCreated: (state, action) => {
      // state.heroes.push(action.payload);
      heroesAdapter.addOne(state, action.payload);
    },
    heroesDeleted: (state, action) => {
      // state.heroes = state.heroes.filter((item) => item.id !== action.payload);
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ф-ция формируется/отправляется
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      //ф-ция успешно выполнена
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        // state.heroes = action.payload;
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      //ф-ция завершилась ошибкой
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      // default - ничего не делаем, state остается прежним
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;
export default reducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

//это ф-ция селектор (т.е. ф-ция, кот содержит часть state)
//не рендерит контент при выборе одного и того же фильтра!
//в createSelector заложена мемоизация ф-ции
export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, heroes) => {
    if (filter === "all") {
      // console.log("render");
      return heroes;
    } else {
      return heroes.filter((item) => item.element === filter);
    }
  }
);

export const { heroesCreated, heroesDeleted } = actions;
