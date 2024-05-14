import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi создает еще и reducer
export const apiSlice = createApi({
  reducerPath: "api", // т.е. это теперь store.api
  //далее метод, кот будет делать запрос
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  //какие теги (метки) есть в apiSlice
  tagTypes: ["Heroes, Filters"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      //к какой метке приписать запрос
      providesTags: ["Heroes"],
    }),
    getFilters: builder.query({
      query: () => "/filters",
      providesTags: ["Filters"],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero,
      }),
      //у какой метки выполнить действия после мутации
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useGetFiltersQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
} = apiSlice;
