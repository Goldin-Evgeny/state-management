import _ from 'lodash';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import {
  loadTodoList,
} from '../../redux/todoSlice';
import RemainingTodoMessage from '../RemainingTodoMessage/RemainingTodoMessage';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';

const TodoApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div className={styles['root']}>
      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <RemainingTodoMessage />
        </div>
        <TodoForm />
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
