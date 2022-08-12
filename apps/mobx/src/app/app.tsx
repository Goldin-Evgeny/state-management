// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoModal } from '@state-management/todo';
import TodoApp from 'libs/todo/src/lib/TodoListApp/TodoListApp';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import store from '../store';

export function App() {
  const todoList = toJS(store.todoList);

  return (
    <>
      <TodoApp
        todoList={todoList}
        editedTodo={store.editedTodo}
        handleEditedTodoChange={(newTodo: string) =>
          (store.editedTodo = newTodo)
        }
        handleToggleTodo={(todo: TodoModal) => store.toggleTodo(todo.id)}
        handleRemoveTodo={(todo: TodoModal) => store.removeTodo(todo.id)}
        handleAddTodo={() => store.addTodo()}
        handleKeyChange={(event: React.KeyboardEvent<HTMLInputElement>) =>
          event.key === 'Enter' && store.addTodo()
        }
      />
      <div />
    </>
  );
}

export default observer(App);
