import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const {
    data: heroes = [], //последний возвращенный результат ( = [] это значение по умолчанию)
    isLoading, //статус - первое обращение к серверу
    isError, //статус - ошибка при запросе к серверу
  } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice(); //это копия heroes
    if (activeFilter === "all") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  const onDelete = useCallback((id) => {
    deleteHero(id);
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">error</h5>;
  }

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
