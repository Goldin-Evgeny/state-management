import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import { atom, selector, selectorFamily } from 'recoil';

export const todoListAtom = atom<TodoModal[]>({
  key: 'todoList',
  default: [],
});

export const editedTodoAtom = atom({
  key: 'editedTodo',
  default: '',
});

export const todoIDListAtom = selector<number[]>({
  key: 'todoIDList',
  get: ({ get }) => _.map(get(todoListAtom), (todo) => todo.id),
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

export const todoByIdAtom = selectorFamily({
  key: 'todoById',
  get:
    (id: number) =>
    ({ get }) => {
      return _.find(get(todoListAtom), { id });
    },
});
