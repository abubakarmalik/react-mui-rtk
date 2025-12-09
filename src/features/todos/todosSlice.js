import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const saved = JSON.parse(localStorage.getItem('todos'));

  if (!Array.isArray(saved)) {
    localStorage.setItem('todos', JSON.stringify([]));
    return [];
  }

  return saved;
});

export const addTodoAsync = createAsyncThunk('todos/add', async (item) => {
  return item;
});

export const editTodoAsync = createAsyncThunk('todos/edit', async (item) => {
  return item;
});

export const removeTodoAsync = createAsyncThunk(
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
        state.error = action.payload || 'Failed to fetch';
      })
      // add todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        const newTodo = {
          ...action.payload,
          id: action.payload.id || nanoid(),
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

export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;
