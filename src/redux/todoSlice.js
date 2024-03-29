import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: action.payload.id,
                text:action.payload.text,
                completed: false
            });
        },
        deleteTodo: (state, action) => {
            state = state.filter((todo) => todo.id != action.payload.id);
        },
        completed: (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.completed =!todo.completed;
                }
                return todo;
            });
        }
    },
})

export const { addTodo, deleteTodo, completed } = todoSlice.actions;

export default todoSlice.reducer;

