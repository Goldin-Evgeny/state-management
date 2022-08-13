import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import { atom, selector } from 'recoil';

export const todoListAtom = atom<TodoModal[]>({
  key: 'todoList',
  default: [],
});

export const editedTodoAtom = atom({
  key: 'editedTodo',
  default: '',
});

export const remainingTodoListSelector = selector({
  key: 'remainingTodoList',
  get: ({ get }) =>
    _.chain(get(todoListAtom))
      .filter((todo) => !todo.done)
      .size()
      .value(),
});

export const todoAlreadyExistsSelector = selector({
  key: 'todoAlreadyExists',
  get: ({ get }) => _.find(get(todoListAtom), { text: get(editedTodoAtom) }),
});

