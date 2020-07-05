import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import heading from '../config/heading';
import {
  addTodoAction,
  toggleTodoAction,
  removeTodoAction,
} from '../redux/ztm-to-do/ztm-to-do.actions';

function ZtmToDo({
  todos,
  addTodoAction: addTodo,
  toggleTodoAction: toggleTodo,
  removeTodoAction: removeTodo,
}) {
  const handleAddTodo = (event) => {
    if (event.key !== 'Enter') return;
    addTodo([
      ...todos,
      {
        id: nanoid(5),
        name: event.target.value,
        complete: false,
      },
    ]);
  };
  const handleToggleTodo = (todoId) => {
    toggleTodo(todoId);
  };
  const handleRemoveTodo = (todoId) => {
    removeTodo(todoId);
  };

  return (
    <>
      <h1>{heading.ztmToDo}</h1>
      <hr />
      <label htmlFor="todo">
        <input type="text" id="todo" onKeyPress={handleAddTodo} />
      </label>
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleToggleTodo(todo.id)}
              />{' '}
              {todo.name}{' '}
              <button type="button" onClick={() => handleRemoveTodo(todo.id)}>
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  todos: state.ztmToDoState.todos,
});

const mapDispatchToProps = (dispatch) => ({
  addTodoAction: (todo) => dispatch(addTodoAction(todo)),
  toggleTodoAction: (id) => dispatch(toggleTodoAction(id)),
  removeTodoAction: (id) => dispatch(removeTodoAction(id)),
});

ZtmToDo.propTypes = {
  todos: PropTypes.array,
  addTodoAction: PropTypes.func,
  toggleTodoAction: PropTypes.func,
  removeTodoAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZtmToDo);
