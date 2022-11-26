import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTodo } from '../../redux/todoSlice';
import styles from './TodoItem.module.scss';

export type TodoItemProps = {
  todoId: number;
};

const TodoItem = (props: TodoItemProps) => {
  const { todoId } = props;
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo.todoList.find(todo => todo.id === todoId));

  if(_.isUndefined(todo)){
    return null;
  }
  
  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>

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
