import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import React, { Dispatch, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type TodoState = {
  todoList: TodoModal[];
  editedTodo: string;
};

type Action =
  | { type: 'setTodoList'; payload: TodoModal[] }
  | { type: 'setEditedTodo'; payload: string }
  | { type: 'addTodo' }
  | { type: 'removeTodo'; payload: string }
  | { type: 'toggleTodo'; payload: string };

export const initialState: TodoState = {
  editedTodo: '',
  todoList: [],
};

export const TodoContext = React.createContext<TodoState>(initialState);
export const DispatchContext = React.createContext<Dispatch<Action>>(() => {});

export const useTodoContext = () => {
  return useContext(TodoContext);
};
export const useDispatchContext = () => {
  return useContext(DispatchContext);
};

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
    case 'addTodo': {
      return {
        ...state,
        todoList: [
          ...state.todoList,
          { id: uuidv4(), done: false, text: state.editedTodo },
        ],
        editedTodo: '',
      };
    }
    case 'removeTodo': {
      const itemIndex = _.findIndex(state.todoList, { id: action.payload });
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, itemIndex),
          ...state.todoList.slice(itemIndex + 1),
        ],
        // todoList: [...state.todoList, {id: uuidv4(), done: false, text: state.editedTodo}],
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
