import _ from 'lodash';
import store from '../../store';
import TodoList from '../TodoList/TodoList';
import { observer } from 'mobx-react';

import styles from './TodoListApp.module.scss';
import React from 'react';
import RemainingTodoMessage from '../RemainingTodoMessage/RemainingTodoMessage';
import TodoForm from '../TodoForm/TodoForm';

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

export default observer(TodoApp);
