// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import TodoApp from '../components/TodoListApp/TodoListApp';
import store from '../store';

export function App() {
  useEffect(() => {
    store.load();
  }, []);

  return (
    <TodoApp />
  );
}

export default observer(App);
