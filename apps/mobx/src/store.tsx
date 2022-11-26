import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { TodoModal } from '@state-management/todo';

class TodoListStore {
  todoList: TodoModal[] = [];
  private newTodo = '';

  constructor() {
    makeAutoObservable(this);
  }

  set editedTodo(value: string) {
    // TODO: add debounce
    this.newTodo = value;
  }

  get editedTodo() {
    return this.newTodo;
  }

  get remainingTodoItems() {
    return _.chain(this.todoList)
      .filter((todo) => !todo.done)
      .size()
      .value();
  }

  get todoAlreadyExists() {
    return _.some(this.todoList, { text: this.newTodo });
  }

  toggleTodo(id: number) {
    const index = _.findIndex(this.todoList, { id });
    this.todoList[index].done = !this.todoList[index].done;
  }

  async load() {
    const response = await fetch('http://localhost:3001/todo');
    const todoList: TodoModal[] = await response.json();
    this.todoList = todoList;
  }
}

const store = new TodoListStore();

export default store;
