import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './ztm-to-do.actionTypes';

const INITIAL_STATE = {
  todos: [],
};

const ztmToDoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: action.todos };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
        ),
      };
    default:
      return state;
  }
};

export default ztmToDoReducer;
