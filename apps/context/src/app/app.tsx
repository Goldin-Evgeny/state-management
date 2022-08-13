// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoModal } from '@state-management/todo';
import React, { useEffect } from 'react';
import { useReducer } from 'react';
import TodoApp from '../components/TodoListApp/TodoListApp';
import { DispatchContext, initialState, reducer, TodoContext } from '../store';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoizedState = React.useMemo(() => state, [state]);
  
  useEffect(() => {
    fetch('http://localhost:3001/todo').then(async (response) => {
      const todoList: TodoModal[] = await response.json();
      dispatch({ type: 'setTodoList', payload: todoList });
    });
  }, []);

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <TodoContext.Provider value={memoizedState}>
          <TodoApp />
        </TodoContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}

export default App;
