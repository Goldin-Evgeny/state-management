import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import { atom } from 'jotai';

export const todoListAtom = atom<TodoModal[]>([]);

export const todoIdListAtom = atom<number[]>((get) => {
  const todoList: TodoModal[] = get(todoListAtom);
  return _.map(todoList, (todo) => todo.id);
});

export const editedTodoAtom = atom('');

export const todoListSizeAtom = atom<number>((get) => {
  const todoList: TodoModal[] = get(todoListAtom);
  return _.size(todoList);
});

export const remainingTodoListSelector = atom<number>((get) => {
  const todoList: TodoModal[] = get(todoListAtom);
  return _.chain(todoList)
    .filter((todo) => !todo.done)
    .size()
    .value();
});

export const todoAlreadyExistsSelector = atom<boolean>((get) => {
  const todoList: TodoModal[] = get(todoListAtom);
  const editedTodo: string = get(editedTodoAtom);
  return !!_.find(todoList, { text: editedTodo });
});
