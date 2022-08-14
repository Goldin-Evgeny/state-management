import { TodoModal } from '@state-management/todo';
import React, { useEffect } from 'react';
import { useReducer } from 'react';
import TodoApp from '../components/TodoListApp/TodoListApp';
import { DispatchContext, initialState, reducer, TodoContext } from '../store';

export function App() {
  /**
   * React use reducer hook.
   * Accepts a reducer function of type (state, action) => newState, and returns the current state paired with a dispatch method.
   */
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
      {/**
       * Separating the dispatch from the state will eliminate
       * unnecessary renders for components that only dispatch actions
       * */}
      <DispatchContext.Provider value={dispatch}>
        <TodoContext.Provider value={memoizedState}>
          <TodoApp />
        </TodoContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}

export default App;
