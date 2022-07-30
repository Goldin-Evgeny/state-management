// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoModal } from '@state-management/todo';
import TodoItem from 'libs/todo/src/lib/TodoItem/TodoItem';
import TodoList from 'libs/todo/src/lib/TodoList/TodoList';
import TodoApp from 'libs/todo/src/lib/TodosApp/TodosApp';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <TodoApp
        TodoList={TodoList}
        TodoItem={TodoItem}
        todos={[
          { text: 'Todo 1', done: true, id: '1' },
          { text: 'Todo 2', done: false, id: '2' },
        ]}
        editedTodo=""
        handleEditedTodoChange={function (newTodo: string): void {
          throw new Error('Function not implemented.');
        }}
        handleToggleTodo={function (todo: TodoModal): void {
          throw new Error('Function not implemented.');
        }}
        handleRemoveTodo={function (todo: TodoModal): void {
          throw new Error('Function not implemented.');
        }}
        handleAddTodo={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleKeyChange={function (
          event: React.KeyboardEvent<HTMLInputElement>
        ): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div />
    </>
  );
}

export default App;
