import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoModal } from '@state-management/todo';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { AppDispatch, AppThunk, RootState } from './store';

export interface TodoState {
  todoList: TodoModal[];
  editedTodo: string;
}

const initialState: TodoState = {
  todoList: [],
  editedTodo: '',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTodoList: (state, action: PayloadAction<TodoModal[]>) => {
      state.todoList = action.payload;
    },
    setEditedTodo: (state, action: PayloadAction<string>) => {
      state.editedTodo = action.payload;
    },
    addTodo: (state) => {
      state.todoList.push({
        id: uuidv4(),
        done: false,
        text: state.editedTodo,
      });
      state.editedTodo = '';
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const index = _.findIndex(state.todoList, { id: action.payload });
      state.todoList[index].done = !state.todoList[index].done;
    },
  },
});

export const { setTodoList, setEditedTodo, addTodo, removeTodo, toggleTodo } =  todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodoList = (state: RootState) => state.todo.todoList;
export const selectEditedTodo = (state: RootState) => state.todo.editedTodo;
export const selectTodoAlreadyExists = (state: RootState) => _.find(state.todo.todoList, { text: state.todo.editedTodo });
export const selectRemainingTodoList = (state: RootState) => _.chain(state.todo.todoList).filter((todo) => !todo.done).size().value();

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const loadTodoList = (): AppThunk => async (dispatch: any) => {
  const response = await fetch('http://localhost:3001/todo');
  const todoList: TodoModal[] = await response.json();
  dispatch(setTodoList(todoList));
};

export default todoSlice.reducer;
