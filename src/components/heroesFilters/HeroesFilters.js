import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../../actions";

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

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

    return arr.map(({ id, ...props }) => {
      let classButton = `btn ${props.myClass}`;
      if (props.name === activeFilter) {
        classButton += " active";
      }
      return (
        <button
          className={classButton}
          key={id}
          onClick={() => dispatch(activeFilterChanged(props.name))}
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
