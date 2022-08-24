import _ from 'lodash';
import React from 'react';
import { useDispatchContext, useTodoContext } from '../../store';

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
          dispatch({ type: 'setEditedTodo', payload: evt.target.value })
        }
        placeholder="Add todo..."
        onKeyUp={(evt) => evt.key === 'Enter' && dispatch({ type: 'addTodo' })}
      />
      <button onClick={() => dispatch({ type: 'addTodo' })}>+</button>
    </div>
  );
}

export default React.memo(TodoForm);