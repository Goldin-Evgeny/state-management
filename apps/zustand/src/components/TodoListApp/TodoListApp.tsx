import _ from 'lodash';
import { useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import { TodoModal } from '@state-management/todo';
import React from 'react';
import { useTodoStore } from '../../store';
import { useRenderCounter } from '@state-management/util';
import RenderCounter from 'libs/util/src/lib/components/RenderCounter/RenderCounter';

const TodoApp = () => {
  const count = useRenderCounter();
  // const [todoList, setTodoList] = useRecoilState(todoListAtom);
  // const remainingTodoList = useRecoilValue(remainingTodoListSelector);
  // const todoAlreadyExists = useRecoilValue(todoAlreadyExistsSelector);
  // const [editedTodo, setEditedTodo] = useRecoilState(editedTodoAtom);
  const loadTodoList = useTodoStore((state) => state.load);
  const todoList = useTodoStore((state) => state.todoList);
  const editedTodo = useTodoStore((state) => state.editedTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const setEditedTodo = useTodoStore((state) => state.setEditedTodo);
  const remainingTodoList = useTodoStore((state) => state.remainingTodoList);
  const todoAlreadyExists = useTodoStore((state) => state.todoAlreadyExists);
  console.log('Rendering TodoApp');

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

  return (
    <div className={styles['root']}>
      <RenderCounter count={count} />

      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <p>
            {_.size(todoList) && remainingTodoList() === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{remainingTodoList()}</b> of{' '}
                <b>{_.size(todoList)}</b> todoList remaining
              </>
            )}
          </p>
        </div>
        <div className={styles['form']}>
          <input
            className={todoAlreadyExists() ? styles['invalid'] : ''}
            type="text"
            value={editedTodo}
            onChange={(evt) => setEditedTodo(evt.target.value)}
            placeholder="Add todo..."
            onKeyUp={(event) => event.key === 'Enter' && addTodo()}
          />
          <button onClick={() => addTodo()}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
