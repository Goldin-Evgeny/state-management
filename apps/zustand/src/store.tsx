import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import create from 'zustand'
interface TodoState {
    todoList:TodoModal[]
    editedTodo:string
    setEditedTodo: (newTodo:string) => void
    removeTodo: (id:number) => void
    addTodo: () => void
    toggleTodo: (id:number) => void
    load: () => void
    remainingTodoList: () => number
    todoAlreadyExists: () => boolean
}
export const useTodoStore = create<TodoState>((set, get) => ({
  todoList: [],
  editedTodo: '',
  setEditedTodo: (newTodo:string) => set((state) => ({...state, editedTodo:newTodo})),
  removeTodo: (id:number) => set((state) => ({...state, todoList:_.filter(state.todoList, (todo) => todo.id !== id)})),
  addTodo: () => set((state) => ({editedTodo: '', todoList: [...state.todoList, {
    id: _.random(Number.MAX_SAFE_INTEGER),
    text: state.editedTodo,
    done: false,
  }]})),
  toggleTodo: (id:number) => set((state) => {
    return {
        ...state,
        todoList: [
          ..._.map(state.todoList, (item) =>
            item.id !== id ? item : { ...item, done: !item.done }
          ),
        ],
      }
  }),
  load: async () => {
    const response = await fetch('http://localhost:3001/todo');
    const todoList: TodoModal[] = await response.json();
    set(state => ({...state, todoList}));
  },
  remainingTodoList: () => _.chain(get().todoList)
  .filter((todo) => !todo.done)
  .size()
  .value(),
  todoAlreadyExists: () => _.some(get().todoList, { text: get().editedTodo })
}))