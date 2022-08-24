import _ from 'lodash';
import React from 'react';
import { useGetTodoListQuery, useAddTodoMutation } from '../../services/todo';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const { data: todoList } = useGetTodoListQuery();
  const [triggerAddTodo] = useAddTodoMutation();
  const [editedTodo, setEditedTodo] = React.useState<string>('');

  const todoAlreadyExists = _.find(todoList, { text: editedTodo });

  return (
    <div className={styles['root']}>
      <input
        className={todoAlreadyExists ? styles['invalid'] : ''}
        type="text"
        value={editedTodo}
        onChange={(evt) => setEditedTodo(evt.target.value)}
        placeholder="Add todo..."
        onKeyUp={(evt) => {
          if (!_.isEqual(evt.key, 'Enter')) {
            return;
          }
          triggerAddTodo({
            id: _.random(Number.MAX_SAFE_INTEGER),
            text: editedTodo,
            done: false,
          });
        }}
      />
      <button
        onClick={() => {
          triggerAddTodo({
            id: _.random(Number.MAX_SAFE_INTEGER),
            text: editedTodo,
            done: false,
          });
          setEditedTodo('');
        }}
      >
        +
      </button>
    </div>
  );
}

export default React.memo(TodoForm);
