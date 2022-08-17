import _ from 'lodash';
import { useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  editedTodoAtom,
  remainingTodoListSelector,
  todoAlreadyExistsSelector,
  todoListAtom,
} from '../../store';
import { TodoModal } from '@state-management/todo';
import React from 'react';
import { useRenderCounter } from '@state-management/util';
import RenderCounter from 'libs/util/src/lib/components/RenderCounter/RenderCounter';



const TodoApp = () => {
  const count = useRenderCounter();
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const remainingTodoList = useRecoilValue(remainingTodoListSelector);
  const todoAlreadyExists = useRecoilValue(todoAlreadyExistsSelector);
  const [editedTodo, setEditedTodo] = useRecoilState(editedTodoAtom);

  console.log('Rendering TodoApp');

  useEffect(() => {
    fetch('http://localhost:3001/todo').then(async (response) => {
      const todoList: TodoModal[] = await response.json();
      setTodoList(todoList);
    });
  }, [setTodoList]);

  return (
    <div className={styles['root']}>
      <RenderCounter count={count} />

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
