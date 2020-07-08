/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
import React, { useRef, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { nanoid } from 'nanoid';
import heading from '../config/heading';

/**
 * Action types
 */
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

/**
 * Action creators
 */
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}
function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}
function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

/**
 * Checker middleware
 */
// eslint-disable-next-line no-unused-vars
const checker = (_store) => (_next) => (_action) => {
  if (
    _action.type === ADD_TODO &&
    _action.todo.name.toLowerCase().indexOf('fuck') !== -1
  ) {
    return alert("Nope. That's a bad idea.");
  }
  if (
    _action.type === ADD_GOAL &&
    _action.goal.name.toLowerCase().indexOf('fuck') !== -1
  ) {
    return alert("Nope. That's a bad idea.");
  }
  return _next(_action);
};

/**
 * Logger middleware
 */
const logger = (_store) => (_next) => (_action) => {
  console.group(_action.type);
  console.log('The action: ', _action);
  const result = _next(_action);
  console.log('The new state: ', _store.getState());
  console.groupEnd();
  return result;
};

/**
 * Reducer function todos
 */
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
      );
    default:
      return state;
  }
}

/**
 * Reducer function goals
 */
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

/**
 * Store
 */
const store = createStore(
  combineReducers({
    todos,
    goals,
  }),
  applyMiddleware(checker, logger)
);

/**
 * UI components
 */

function List({ items, toggle, remove }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span
            onClick={() => toggle && toggle(item.id)}
            style={{ textDecoration: item.complete ? 'line-through' : 'none' }}
          >
            {item.name}
          </span>
          <button type="button" onClick={() => remove(item)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

function Todos({ store: storeTodos, todosTodos = [] }) {
  const inputRef = useRef();

  const addItem = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    inputRef.current.value = '';
    storeTodos.dispatch(
      addTodoAction({
        id: nanoid(5),
        name,
        complete: false,
      })
    );
  };
  const removeItem = (todo) => {
    storeTodos.dispatch(removeTodoAction(todo.id));
  };
  const toggleItem = (id) => {
    storeTodos.dispatch(toggleTodoAction(id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input type="text" placeholder="Add todo" ref={inputRef} />
      <button type="button" onClick={addItem}>
        Add todo
      </button>
      <List items={todosTodos} toggle={toggleItem} remove={removeItem} />
    </div>
  );
}

function Goals({ store: storeGoals, goalsGoals = [] }) {
  const inputRef = useRef();

  const addItem = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    inputRef.current.value = '';
    storeGoals.dispatch(
      addGoalAction({
        id: nanoid(5),
        name,
      })
    );
  };
  const removeItem = (goal) => {
    storeGoals.dispatch(removeGoalAction(goal.id));
  };

  return (
    <div>
      <h2>Goals</h2>
      <input type="text" placeholder="Add todo" ref={inputRef} />
      <button type="button" onClick={addItem}>
        Add todo
      </button>
      <List items={goalsGoals} remove={removeItem} />
    </div>
  );
}

function UidToDo2({ storeUidToDo = store }) {
  // eslint-disable-next-line no-plusplus, no-param-reassign
  const [, forceUpdate] = useReducer((x) => ++x, 0);
  const {
    todos: todosUidToDo2,
    goals: goalsUidToDo2,
  } = storeUidToDo.getState();

  useEffect(() => {
    // TODO: Force update to work in functional component
    storeUidToDo.subscribe(() => forceUpdate());
  }, [storeUidToDo]);

  return (
    <div>
      <h1>{heading.uidToDo2}</h1>
      <Todos todos={todosUidToDo2} store={storeUidToDo} />
      <Goals goals={goalsUidToDo2} store={storeUidToDo} />
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array,
  toggle: PropTypes.func,
  remove: PropTypes.func,
};
Todos.propTypes = {
  store: PropTypes.object,
  todosTodos: PropTypes.array,
};
Goals.propTypes = {
  store: PropTypes.object,
  goalsGoals: PropTypes.array,
};
UidToDo2.propTypes = {
  storeUidToDo: PropTypes.object,
};

export default UidToDo2;
