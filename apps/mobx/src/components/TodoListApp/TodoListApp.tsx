import _ from 'lodash';
import store from '../../store';
import TodoList from '../TodoList/TodoList';
import { observer } from 'mobx-react';

import styles from './TodoListApp.module.scss';

const TodoApp = () => {

  console.log('Rendering TodoApp');

  return (
    <div className={styles['root']}>
      <div className={styles['todo']}>
        <div className={styles['header']}>
          <h1>Todo List</h1>
          <p>
            {_.size(store.todoList) && store.remainingTodoItems === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{store.remainingTodoItems}</b> of <b>{_.size(store.todoList)}</b>{' '}
                todoList remaining
              </>
            )}
          </p>
        </div>
        <div className={styles['form']}>
          <input
            className={store.todoAlreadyExists ? styles['invalid'] : ''}
            type="text"
            value={store.editedTodo}
            onChange={(evt) => store.editedTodo = evt.target.value}
            placeholder="Add todo..."
            onKeyUp={(evt) => evt.key === 'Enter' && store.addTodo()}
          />
          <button onClick={() => store.addTodo()}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default observer(TodoApp);