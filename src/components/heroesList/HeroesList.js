import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDeleted,
} from "../../actions";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  //это ф-ция селектор (т.е. ф-ция, кот содержит часть state)
  //не рендерит контент при выборе одного и того же фильтра!
  //в createSelector заложена мемоизация ф-ции
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        // console.log("render");
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const onDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE").then(() =>
      dispatch(heroesDeleted(id))
    );
  };

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
