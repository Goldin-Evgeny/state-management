import classNames from 'classnames';
import { TodoModal } from '../types';
import styles from './TodoItem.module.scss';

export type TodoItemProps = {
  todo: TodoModal;
  handleToggleTodo: Function;
  handleRemoveTodo: Function;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, handleRemoveTodo, handleToggleTodo } = props;

  const prefixClass = 'todo-item';

  return (
    <li className={classNames(styles['root'], todo.done ? styles['done'] : '')}>
      <div className={styles['infos']}>
        <label className={styles['checkbox']}>
          <input
            type="checkbox"
            onChange={() => handleToggleTodo(todo)}
            checked={todo.done}
          />
          <div className={styles['el']} />
        </label>
        <div className={styles['text']}>{todo.text}</div>
      </div>
      <div className={styles['remove']}>
        <button onClick={() => handleRemoveTodo(todo)} title="Remover item">
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

export default TodoItem;
