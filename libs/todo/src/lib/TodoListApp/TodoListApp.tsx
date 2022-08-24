import _ from 'lodash';
import { KeyboardEventHandler } from 'react';
import TodoList from '../TodoList/TodoList';
import { TodoModal } from '../types';
import styles from './TodoListApp.module.scss';

export type TodoAppProps = {
  todoList: TodoModal[];
  editedTodo: string;
  handleEditedTodoChange: (newTodo: string) => void;
  handleToggleTodo: (todo: TodoModal) => void;
  handleRemoveTodo: (todo: TodoModal) => void;
  handleAddTodo: () => void;
  handleKeyChange: KeyboardEventHandler<HTMLInputElement>;
};

const TodoApp = (props: TodoAppProps) => {
  const {
    todoList,
    editedTodo,
    handleEditedTodoChange,
    handleToggleTodo,
    handleRemoveTodo,
    handleAddTodo,
    handleKeyChange,
  } = props;

  const todoAlreadyExists = _.find(todoList, { text: editedTodo });
  const remainingTodoList = _.chain(todoList)
    .filter((todo) => !todo.done)
    .size()
    .value();


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
            onChange={(evt) => handleEditedTodoChange(evt.target.value)}
            placeholder="Add todo..."
            onKeyUp={handleKeyChange}
          />
          <button onClick={() => handleAddTodo()}>+</button>
        </div>
        <div className={styles['body']}>
          <TodoList
            todoList={todoList}
            handleToggleTodo={handleToggleTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
