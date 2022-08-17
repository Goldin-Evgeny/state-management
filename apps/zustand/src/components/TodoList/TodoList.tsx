import { TodoModal } from '@state-management/todo';
import _ from 'lodash';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';
import React from 'react';
import { useTodoStore } from '../../store';
const useCounter = process.env['NX_USE_COUNT_FEATURE'] === 'true';

const TodoList = () => {
  const todoList = useTodoStore(state => state.todoList);
  
  const renderCounter = React.useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log('Rendering TodoList');

  if (_.isEmpty(todoList)) {
    return (
      <div className={styles['empty']}>
        {useCounter && (
        <span className={styles['counter']}>{renderCounter.current}</span>
      )}
        <p>
          <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(2.5 4.5)"
            >
              <path d="m3.65939616 0h8.68120764c.4000282 0 .7615663.23839685.9191451.6060807l2.7402511 6.3939193v4c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-4l2.74025113-6.3939193c.15757879-.36768385.51911692-.6060807.91914503-.6060807z" />
              <path d="m0 7h4c.55228475 0 1 .44771525 1 1v1c0 .55228475.44771525 1 1 1h4c.5522847 0 1-.44771525 1-1v-1c0-.55228475.4477153-1 1-1h4" />
            </g>
          </svg>
        </p>
        <p>
          <b>Empty list</b>
        </p>
        <p>Add a new todo above</p>
      </div>
    );
  }

  return (
    <ul>
      {useCounter && (
        <span className={styles['counter']}>{renderCounter.current}</span>
      )}
      {_.map(todoList, (todo: TodoModal) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
