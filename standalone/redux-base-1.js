/**
 * Library code
 */

// Create store function
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state (Get the state)
  // 3. Listen to changes on the state (subscribe)
  // 4. Update the state (dispatch)

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (_action) => {
    state = reducer(state, _action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

/**
 * App codes
 */

// Type constants
const ADD_TODO = 'APP_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action creators
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

// Reducer function 1
function todos(state = [], _action) {
  switch (_action.type) {
    case ADD_TODO:
      return state.concat([_action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== _action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== _action.id ? todo : { ...todo, complete: !todo.complete }
      );
    default:
      return state;
  }
}

// Reducer function 2
function goals(state = [], _action) {
  switch (_action.type) {
    case ADD_GOAL:
      return state.concat([_action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== _action.id);
    default:
      return state;
  }
}

// Root reducer function
function app(state = {}, _action) {
  return {
    todos: todos(state.todos, _action),
    goals: goals(state.goals, _action),
  };
}

const store = createStore(app);

// Utility function
function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

// DOM code
function createRemoveButton(onClick) {
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'X';
  removeBtn.addEventListener('click', onClick);

  return removeBtn;
}

function addTodoToDOM(todo) {
  const node = document.createElement('li');
  const text = document.createTextNode(todo.name);

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeTodoAction(todo.id));
  });

  node.appendChild(text);
  node.appendChild(removeBtn);

  node.style.textDecoration = todo.complete ? 'line-through' : 'none';
  node.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id));
  });

  document.getElementById('todos').appendChild(node);
}

function addGoalToDOM(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id));
  });

  node.appendChild(text);
  node.appendChild(removeBtn);

  document.getElementById('goals').appendChild(node);
}

function addTodo() {
  const input = document.getElementById('todo');
  const name = input.value;
  input.value = '';

  store.dispatch(
    addTodoAction({
      id: generateId(),
      name,
      complete: false,
    })
  );
}

function addGoal() {
  const input = document.getElementById('goal');
  const name = input.value;
  input.value = '';

  store.dispatch(
    addGoalAction({
      id: generateId(),
      name,
    })
  );
}

document.getElementById('todoBtn').addEventListener('click', addTodo);
document.getElementById('goalBtn').addEventListener('click', addGoal);

// Subscribe function
store.subscribe(() => {
  const { goals: goalStates, todos: todoStates } = store.getState();

  document.getElementById('goals').innerHTML = '';
  document.getElementById('todos').innerHTML = '';

  goalStates.forEach(addGoalToDOM);
  todoStates.forEach(addTodoToDOM);
});
