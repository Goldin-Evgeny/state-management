import React from 'react';

import { TodoModal } from '@state-management/todo';
import classNames from 'classnames';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../services/todo';
import styles from './TodoItem.module.scss';

export type TodoItemProps = {
  todo: TodoModal;
};


const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;
  const [toggleTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>
      <div className={styles['infos']}>
        <label className={styles['checkbox']}>
          <input
            type="checkbox"
            onChange={() => toggleTodo({...todo, done: !todo.done})}
            checked={todo.done}
          />
          <div className={styles['el']} />
        </label>
        <div className={styles['text']}>{todo.text}</div>
      </div>
      <div className={styles['remove']}>
        <button onClick={() => deleteTodo(todo.id)} title="Remover item">
          <svg
            height="21"
            viewBox="0 0 21 21"
            width="21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(5 5)"
            >
              <path d="m10.5 10.5-10-10z" />
              <path d="m10.5.5-10 10" />
            </g>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default React.memo(TodoItem);
