import _ from 'lodash';
import React from 'react';
import { KeyboardEventHandler } from 'react';
import { useAddTodoMutation, useGetTodoListQuery } from '../../services/todo';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import { v4 as uuidv4 } from 'uuid';
const useCounter = process.env['NX_USE_COUNT_FEATURE'] === 'true';

const TodoApp = () => {
  const { data } = useGetTodoListQuery();
  const [triggerAddTodo] = useAddTodoMutation();
  const [editedTodo, setEditedTodo] = React.useState<string>('');


  const renderCounter = React.useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const todoAlreadyExists = _.find(data, { text: editedTodo });
  const remainingTodoList = _.chain(data)
    .filter((todo) => !todo.done)
    .size()
    .value();

  console.log('Rendering TodoApp');

  return (
    <div className={styles['root']}>
      {useCounter && (
        <span className={styles['counter']}>{renderCounter.current}</span>
      )}
      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <p>
            {_.size(data) && remainingTodoList === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{remainingTodoList}</b> of <b>{_.size(data)}</b>{' '}
                todoList remaining
              </>
            )}
          </p>
        </div>
        <div className={styles['form']}>
          <input
            className={todoAlreadyExists ? styles['invalid'] : ''}
            type="text"
            value={editedTodo}
            onChange={(evt) => setEditedTodo(evt.target.value)}
            placeholder="Add todo..."
            onKeyUp={(evt) => evt.key === 'Enter' && triggerAddTodo({
              id: uuidv4(),
              text: editedTodo,
              done: false,
            })}
          />
          <button onClick={() => triggerAddTodo({
              id: uuidv4(),
              text: editedTodo,
              done: false,
            })}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
