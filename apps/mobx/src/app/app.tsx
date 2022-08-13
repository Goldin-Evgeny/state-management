// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoModal } from '@state-management/todo';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import TodoApp from '../components/TodoListApp/TodoListApp';
import store from '../store';

export function App() {
  const todoList = toJS(store.todoList);

  useEffect(() => {
    store.load();
  }, []);

  return (
    <TodoApp />
  );
}

export default observer(App);
