import _ from 'lodash';
import React from 'react';
import { addTodo, setEditedTodo, useDispatchContext, useTodoContext } from '../../store';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const { todoList, editedTodo } = useTodoContext();
  const dispatch = useDispatchContext();

  const todoAlreadyExists = _.find(todoList, { text: editedTodo });

  return (
    <div className={styles['root']}>
      <input
        className={todoAlreadyExists ? styles['invalid'] : ''}
        type="text"
        value={editedTodo}
        onChange={(evt) =>
          dispatch(setEditedTodo(evt.target.value))
        }
        placeholder="Add todo..."
        onKeyUp={(evt) => evt.key === 'Enter' && dispatch(addTodo())}
      />
      <button onClick={() => dispatch(addTodo())}>+</button>
    </div>
  );
}

export default React.memo(TodoForm);