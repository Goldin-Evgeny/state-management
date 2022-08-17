import { TodoModal } from '@state-management/todo';
import { useRenderCounter } from '@state-management/util';
import classNames from 'classnames';
import RenderCounter from 'libs/util/src/lib/components/RenderCounter/RenderCounter';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { removeTodo, toggleTodo } from '../../redux/todoSlice';
import styles from './TodoItem.module.scss';

export type TodoItemProps = {
  todo: TodoModal;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;
  const dispatch = useAppDispatch();
  console.log('Rendering TodoItem');

  const count = useRenderCounter();
  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>
      <RenderCounter count={count} />

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
        <button
          onClick={() => dispatch(removeTodo(todo.id))}
          title="Remover item"
        >
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
