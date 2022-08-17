import { TodoModal } from '@state-management/todo';
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { removeTodo, toggleTodo } from '../../redux/todoSlice';
import styles from './TodoItem.module.scss';

export type TodoItemProps = {
  todo: TodoModal;
};
const useCounter = true;

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;
  const dispatch = useAppDispatch();
  console.log('Rendering TodoItem');

  const renderCounter = React.useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>
      {useCounter && (
        <span className={styles['counter']}>{renderCounter.current}</span>
      )}
      <div className={styles['infos']}>
        <label className={styles['checkbox']}>
          <input
            type="checkbox"
            onChange={() => dispatch(toggleTodo(todo.id))}
            checked={todo.done}
          />
          <div className={styles['el']} />
        </label>
        <div className={styles['text']}>{todo.text}</div>
      </div>
      <div className={styles['remove']}>
        <button onClick={() => dispatch(removeTodo(todo.id))} title="Remover item">
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
