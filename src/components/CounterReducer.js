import React, { useReducer } from 'react';

export default function CounterReducer() {
  const reducer = (stateReducer, action) => {
    switch (action.type) {
      case 'increment':
        return stateReducer + 1;
      case 'decrement':
        return stateReducer - 1;
      case 'reset':
        return 0;
      default:
        throw new Error(`This action type isn't supported.`);
    }
  };
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <div>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>
          increment
        </button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
          decrement
        </button>
        <button type="button" onClick={() => dispatch({ type: 'reset' })}>
          reset
        </button>
      </div>
      <div>
        Counter: <span>{state}</span>
      </div>
    </>
  );
}
