import _ from 'lodash';
import { useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import { TodoModal } from '@state-management/todo';
import React from 'react';
import { useTodoStore } from '../../store';
import RemainingTodoMessage from '../RemainingTodoMessage/RemainingTodoMessage';
import TodoForm from '../TodoForm/TodoForm';

const TodoApp = () => {
  const loadTodoList = useTodoStore((state) => state.load);

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

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
