import _ from 'lodash';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectEditedTodo,
  selectTodoAlreadyExists,
  setEditedTodo,
  addTodo,
} from '../../redux/todoSlice';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const dispatch = useAppDispatch();
  const editedTodo = useAppSelector(selectEditedTodo);
  const todoAlreadyExists = useAppSelector(selectTodoAlreadyExists);

  return (
    <div className={styles['root']}>
      <input
        className={todoAlreadyExists ? styles['invalid'] : ''}
        type="text"
        value={editedTodo}
        onChange={(evt) => dispatch(setEditedTodo(evt.target.value))}
        placeholder="Add todo..."
        onKeyUp={(evt) => evt.key === 'Enter' && dispatch(addTodo())}
      />
      <button onClick={() => dispatch(addTodo())}>+</button>
    </div>
  );
}

export default React.memo(TodoForm);
