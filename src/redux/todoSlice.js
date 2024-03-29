import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
        console.log(action);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
        const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      },
  },
});

export const {addTodo, deleteTodo, toggleCompleted} = todoSlice.actions;

export default todoSlice.reducer;
