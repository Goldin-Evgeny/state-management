import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoModal } from '@state-management/todo';
import _ from 'lodash';

export const todoListApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  reducerPath: 'todoListApi',
  tagTypes: ['TODO_LIST'],
  endpoints: (build) => ({
    getTodoList: build.query<TodoModal[], void>({
      query: () => '/todo',
      providesTags: ['TODO_LIST'],
    }),
    addTodo: build.mutation<TodoModal, Partial<TodoModal>>({
      query(body) {
        return {
          url: `todo`,
          method: 'POST',
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: ['TODO_LIST'],
    }),
    updateTodo: build.mutation<TodoModal, Partial<TodoModal>>({
      query(body) {
        return {
          url: `todo/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: ['TODO_LIST'],
    }),
    deleteTodo: build.mutation<TodoModal, string>({
      query(id) {
        return {
          url: `todo/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: ['TODO_LIST'],
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useLazyGetTodoListQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoListApi;
