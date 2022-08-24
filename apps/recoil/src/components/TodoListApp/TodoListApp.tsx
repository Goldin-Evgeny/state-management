import _ from 'lodash';
import { useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import { useSetRecoilState } from 'recoil';
import {
  todoListAtom,
} from '../../store';
import { TodoModal } from '@state-management/todo';
import RemainingTodoMessage from '../RemainingTodoMessage/RemainingTodoMessage';
import TodoForm from '../TodoForm/TodoForm';

const TodoApp = () => {
  const setTodoList = useSetRecoilState(todoListAtom);

  useEffect(() => {
    fetch('http://localhost:3001/todo').then(async (response) => {
      const todoList: TodoModal[] = await response.json();
      setTodoList(todoList);
    });
  }, [setTodoList]);

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
