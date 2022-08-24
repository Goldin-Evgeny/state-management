import _ from 'lodash';
import React from 'react';
import RemainingTodoMessage from '../RemainingTodoMessage/RemainingTodoMessage';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';

const TodoApp = () => {
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

export default React.memo(TodoApp);
