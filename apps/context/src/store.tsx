import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import React, { Dispatch, useContext } from 'react';

export type TodoState = {
  todoList: TodoModal[];
  editedTodo: string;
};

type Action =
  | { type: 'setTodoList'; payload: TodoModal[] }
  | { type: 'setEditedTodo'; payload: string }
  | { type: 'addTodo' }
  | { type: 'removeTodo'; payload: number }
  | { type: 'toggleTodo'; payload: number };
  
  export const setTodoList = (payload: TodoModal[]):Action => ({ type: 'setTodoList', payload });
  export const setEditedTodo = (payload: string):Action => ({ type: 'setEditedTodo', payload });
  export const addTodo = ():Action => ({ type: 'addTodo' });
  export const removeTodo = (payload: number):Action => ({ type: 'removeTodo', payload });
  export const toggleTodo = (payload: number):Action => ({ type: 'toggleTodo', payload });

export const initialState: TodoState = {
  editedTodo: '',
  todoList: [],
};

/**
 * React context will create an object which coupled with useContext hook will act a sort of
 * dependency injection, allowing us to wrap the app with Context.Provider and using the useContext hook
 * extract the data from components deep in the tree, avoiding drilling the props all the way down.
 */
export const TodoContext = React.createContext<TodoState>(initialState);
export const DispatchContext = React.createContext<Dispatch<Action>>((action:Action) => initialState);

export const useTodoContext = () => {
  return useContext(TodoContext);
};
export const useDispatchContext = () => {
  return useContext(DispatchContext);
};

/**
 * Reducer function that will be used by the useReducer hook, it will accept the current
 * state and with it and the action will produce a new state.
 */
export function reducer(state: TodoState, action: Action) {
  switch (action.type) {
    case 'setTodoList': {
      return {
        ...state,
        todoList: action.payload,
      };
    }
    case 'setEditedTodo': {
      return {
        ...state,
        editedTodo: action.payload,
      };
    }
    case 'toggleTodo': {
      return {
        ...state,
        todoList: [
          ..._.map(state.todoList, (item) =>
            item.id !== action.payload ? item : { ...item, done: !item.done }
          ),
        ],
      };
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      throw new Error('Not know error');
    }
  }
}
