import { TodoModal } from '@state-management/todo';
import classNames from 'classnames';
import React from 'react';
import styles from './TodoItem.module.scss';
import { useTodoStore } from '../../store';
import _ from 'lodash';

export type TodoItemProps = {
  todoId: number;
};

const TodoItem = (props: TodoItemProps) => {
  const { todoId } = props;

  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const todo = useTodoStore((state) => _.find(state.todoList, (todo: TodoModal) => todo.id === todoId));


  if(_.isUndefined(todo)){
    return null;
  }

  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>
      <div className={styles['infos']}>
        <label className={styles['checkbox']}>
          <input
            type="checkbox"
            onChange={() => toggleTodo(todo.id)}
            checked={todo.done}
          />
          <div className={styles['el']} />
        </label>
        <div className={styles['text']}>{todo.text}</div>
      </div>
      <div className={styles['remove']}>
        <button onClick={() => removeTodo(todo.id)} title="Remover item">
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
