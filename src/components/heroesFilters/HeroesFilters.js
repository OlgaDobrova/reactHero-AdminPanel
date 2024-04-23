import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetched,
  heroesFetchingError,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../../actions";

import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const filterHero = (props) => {
    if (props.name === "all") {
      request(`http://localhost:3001/heroes`)
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
    } else {
      request(`http://localhost:3001/heroes?element=${props.name}`)
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
    }
  };

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFiltersList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтров пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <button
          className={`btn ${props.myClass}`}
          key={id}
          onClick={() => filterHero(props)}
        >
          {props.label}
        </button>
      );
    });
  };

  const buttons = renderFiltersList(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{buttons}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;