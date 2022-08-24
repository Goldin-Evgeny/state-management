import _ from 'lodash';
import React from 'react';
import { useTodoStore } from '../../store';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const editedTodo = useTodoStore((state) => state.editedTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const setEditedTodo = useTodoStore((state) => state.setEditedTodo);
  const todoAlreadyExists = useTodoStore((state) => state.todoAlreadyExists);

  return (
    <div className={styles['root']}>
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
  );
}

export default React.memo(TodoForm);
