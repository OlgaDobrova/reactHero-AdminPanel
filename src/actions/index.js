export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesDeleted = (id) => {
  return {
    type: "HERO_DELETED",
    payload: id,
  };
};

export const heroesCreated = (newHero) => {
  return {
    type: "HERO_CREATED",
    payload: newHero,
  };
};

export const activeFilterChanged = (element) => {
  return {
    type: "ACTIVE_FILTER_CHANGED",
    payload: element,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};
