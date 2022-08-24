import _ from 'lodash';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  todoListAtom,
  todoAlreadyExistsSelector,
  editedTodoAtom,
} from '../../store';

import styles from './TodoForm.module.scss';

function TodoForm() {
  const setTodoList = useSetRecoilState(todoListAtom);
  const todoAlreadyExists = useRecoilValue(todoAlreadyExistsSelector);
  const [editedTodo, setEditedTodo] = useRecoilState(editedTodoAtom);

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
          setTodoList((prevState) =>
            todoAlreadyExists
              ? prevState
              : [
                  ...prevState,
                  { id: _.random(Number.MAX_SAFE_INTEGER), text: editedTodo, done: false },
                ]
          );
          setEditedTodo('');
        }}
      />
      <button
        onClick={() => {
          setTodoList((prevState) =>
            todoAlreadyExists
              ? prevState
              : [
                  ...prevState,
                  { id: _.random(Number.MAX_SAFE_INTEGER), text: editedTodo, done: false },
                ]
          );
          setEditedTodo('');
        }}
      >
        +
      </button>
    </div>
  );
}

export default React.memo(TodoForm);
