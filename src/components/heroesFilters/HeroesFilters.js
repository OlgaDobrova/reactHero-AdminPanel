import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../../actions";

import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  const filtersRefs = useRef([]);

  const focusOnFilter = (index) => {
    filtersRefs.current.forEach((item) => {
      item.classList.remove("active");
    });
    filtersRefs.current[index].classList.add("active");
  };

  const filterHero = (props, index) => {
    focusOnFilter(index);
    dispatch(activeFilterChanged(props.name));
  };

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
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

    return arr.map(({ id, ...props }, index) => {
      return (
        <button
          className={`btn ${props.myClass}`}
          key={id}
          ref={(element) => (filtersRefs.current[index] = element)}
          onClick={() => filterHero(props, index)}
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
