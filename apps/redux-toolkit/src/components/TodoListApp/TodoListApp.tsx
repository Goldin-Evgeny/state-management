import _ from 'lodash';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addTodo,
  loadTodoList,
  selectEditedTodo,
  selectRemainingTodoList,
  selectTodoAlreadyExists,
  selectTodoList,
  setEditedTodo,
} from '../../redux/todoSlice';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);
  const editedTodo = useAppSelector(selectEditedTodo);
  const todoAlreadyExists = useAppSelector(selectTodoAlreadyExists);
  const remainingTodoItems = useAppSelector(selectRemainingTodoList);

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div className={styles['root']}>
      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <p>
            {_.size(todoList) && remainingTodoItems === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{remainingTodoItems}</b> of{' '}
                <b>{_.size(todoList)}</b> todoList remaining
              </>
            )}
          </p>
        </div>
        <div className={styles['form']}>
          <input
            className={todoAlreadyExists ? styles['invalid'] : ''}
            type="text"
            value={editedTodo}
            onChange={(evt) => dispatch(setEditedTodo(evt.target.value))}
            placeholder="Add todo..."
            onKeyUp={(evt) => evt.key === 'Enter' && dispatch(addTodo())}
          />
          <button onClick={() => dispatch(addTodo())}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
