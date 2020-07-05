import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './ztm-to-do.actionTypes';

export const addTodoAction = (todos) => ({
  type: ADD_TODO,
  todos,
});

export const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id,
});

export const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  id,
});
