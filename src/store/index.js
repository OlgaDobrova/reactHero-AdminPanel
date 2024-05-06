import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

// enhancer может дополнять любую ф-цию store
// middelware дополняет только dispatch

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

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

// thunk - это middelware, кот позволяет dispatch-чить ф-ции, в том числе и асинхронные ф-ции!!!

const store = createStore(
  combineReducers({ heroes, filters }),
  compose(
    applyMiddleware(thunk, stribgMiddelware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
