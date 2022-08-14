import _ from 'lodash';
import { KeyboardEventHandler } from 'react';
import { useDispatchContext, useTodoContext } from '../../store';
import TodoList from '../TodoList/TodoList';
import styles from './TodoListApp.module.scss';

const TodoApp = () => {
  const { todoList, editedTodo } = useTodoContext();
  const dispatch = useDispatchContext();
  const todoAlreadyExists = _.find(todoList, { text: editedTodo });
  const remainingTodoList = _.chain(todoList)
    .filter((todo) => !todo.done)
    .size()
    .value();

  console.log('Rendering TodoApp');

  return (
    <div className={styles['root']}>
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
            onChange={(evt) => dispatch({ type: 'setEditedTodo', payload: evt.target.value })}
            placeholder="Add todo..."
            onKeyUp={(evt) => evt.key === 'Enter' && dispatch({ type: 'addTodo' })}
          />
          <button onClick={() => dispatch({ type: 'addTodo' })}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;