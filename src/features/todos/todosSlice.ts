import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types/types';

// types and interface
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetch', async () => {
  const saved = JSON.parse(localStorage.getItem('todos') || '[]');
  return Array.isArray(saved) ? saved : [];
});

export const addTodoAsync = createAsyncThunk<
  Omit<Todo, 'id'>,
  Omit<Todo, 'id'>
>('todos/add', async (item) => item);

export const editTodoAsync = createAsyncThunk<Todo, Todo>(
  'todos/edit',
  async (item) => item,
);

export const removeTodoAsync = createAsyncThunk<string, string>(
  'todos/remove',
  async (id) => id,
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      })
      // add todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        const newTodo: Todo = {
          ...action.payload,
          id: nanoid(),
        };
        state.todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      })
      // edit todo
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }

        localStorage.setItem('todos', JSON.stringify(state.todos));
      })
      // remove todo
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      });
  },
});

export default todosSlice.reducer;
