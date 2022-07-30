import _ from 'lodash';
import React, { KeyboardEventHandler } from 'react';
import { TodoItemProps } from '../TodoItem/TodoItem';
import TodoList, { TodoListProps } from '../TodoList/TodoList';
import { TodoModal } from '../types';
import styles from './TodosApp.module.scss';
export type TodoAppProps = {
  TodoList: React.ElementType<TodoListProps>;
  TodoItem: React.ElementType<TodoItemProps>;
  todos: TodoModal[];
  editedTodo: string;
  handleEditedTodoChange: (newTodo: string) => void;
  handleToggleTodo: (todo: TodoModal) => void;
  handleRemoveTodo: (todo: TodoModal) => void;
  handleAddTodo: () => void;
  handleKeyChange: KeyboardEventHandler<HTMLInputElement>;
};

const TodoApp = (props: TodoAppProps) => {
  const {
    TodoList,
    TodoItem,
    todos,
    editedTodo,
    handleEditedTodoChange,
    handleToggleTodo,
    handleRemoveTodo,
    handleAddTodo,
    handleKeyChange,
  } = props;

  const todoAlreadyExists = _.find(todos, { text: editedTodo });
  const remainingTodos = _.chain(todos)
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
            {_.size(todos) && remainingTodos === 0 ? (
              'All done!'
            ) : (
              <>
                You have <b>{remainingTodos}</b> of <b>{_.size(todos)}</b> todos
                remaining
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
            TodoItem={TodoItem}
            todos={todos}
            handleToggleTodo={handleToggleTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
