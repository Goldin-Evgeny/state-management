import _ from 'lodash';
import { KeyboardEventHandler, useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import {
  editedTodoAtom,
  remainingTodoListSelector,
  todoAlreadyExistsSelector,
  todoListAtom,
} from '../../store';
import { TodoModal } from '@state-management/todo';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
const useCounter = process.env['NX_USE_COUNT_FEATURE'] === 'true';

const TodoApp = () => {
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const remainingTodoList = useAtomValue(remainingTodoListSelector);
  const todoAlreadyExists = useAtomValue(todoAlreadyExistsSelector);
  const [editedTodo, setEditedTodo] = useAtom(editedTodoAtom);
  console.log('Rendering TodoApp');

  const renderCounter = React.useRef(0);
  renderCounter.current = renderCounter.current + 1;
  useEffect(() => {
    fetch('http://localhost:3001/todo').then(async (response) => {
      const todoList: TodoModal[] = await response.json();
      setTodoList(todoList);
    });
  }, []);

  return (
    <div className={styles['root']}>
      {useCounter && (
        <span className={styles['counter']}>{renderCounter.current}</span>
      )}
      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <p>
            {_.size(todoList) && remainingTodoList === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{remainingTodoList}</b> of <b>{_.size(todoList)}</b>{' '}
                todoList remaining
              </>
            )}
          </p>
        </div>
        <div className={styles['form']}>
          <input
            className={todoAlreadyExists ? styles['invalid'] : ''}
            type="text"
            value={editedTodo}
            onChange={(evt) => setEditedTodo(evt.target.value)}
            placeholder="Add todo..."
            onKeyUp={(event) =>
              event.key === 'Enter' &&
              setTodoList((prevState) =>
                todoAlreadyExists
                  ? prevState
                  : [
                      ...prevState,
                      { id: _.uniqueId(), text: editedTodo, done: false },
                    ]
              )
            }
          />
          <button
            onClick={() =>
              setTodoList((prevState) =>
                todoAlreadyExists
                  ? prevState
                  : [
                      ...prevState,
                      { id: _.uniqueId(), text: editedTodo, done: false },
                    ]
              )
            }
          >
            +
          </button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
