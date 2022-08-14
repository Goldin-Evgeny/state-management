import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import { atom, PrimitiveAtom, useAtom } from 'jotai';

export const todoListAtom = atom<TodoModal[]>([]);

export const editedTodoAtom = atom('');

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
