import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { TodoModal } from '@state-management/todo';

class TodoListStore {
  todoList: TodoModal[] = [];
  private newTodo: string = '';

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

  removeTodo(id: string) {
    this.todoList = _.filter(this.todoList, (todo) => todo.id !== id);
  }

  toggleTodo(id: string) {
    const index = _.findIndex(this.todoList, { id: id });
    this.todoList[index].done = !this.todoList[index].done;
  }

  addTodo() {
    if (this.todoAlreadyExists) {
      return;
    }
    this.todoList.push({
      id: uuidv4(),
      text: this.newTodo,
      done: false,
    });
    this.newTodo = '';
  }

  async load() {
    const response = await fetch('http://localhost:3001/todo');
    const todoList: TodoModal[] = await response.json();
    store.todoList = todoList;
  }
}

const store = new TodoListStore();

export default store;
