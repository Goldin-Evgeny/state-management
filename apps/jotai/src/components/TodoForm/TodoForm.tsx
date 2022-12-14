import { useAtom, useAtomValue } from 'jotai';
import _ from 'lodash';
import React from 'react';
import {
  editedTodoAtom,
  todoAlreadyExistsSelector,
  todoListAtom,
} from '../../store';
import { useUpdateAtom } from 'jotai/utils';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const setTodoList = useUpdateAtom(todoListAtom);
  const todoAlreadyExists = useAtomValue(todoAlreadyExistsSelector);
  const [editedTodo, setEditedTodo] = useAtom(editedTodoAtom);

  return (
    <div className={styles['root']}>
      <input
        className={todoAlreadyExists ? styles['invalid'] : ''}
        type="text"
        value={editedTodo}
        onChange={(evt) => setEditedTodo(evt.target.value)}
        placeholder="Add todo..."
        onKeyUp={(event) => {
          if (!_.isEqual(event.key, 'Enter')) {
            return;
          }

        }}
      />
      <button>
        +
      </button>
    </div>
  );
}

export default React.memo(TodoForm);
