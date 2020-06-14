import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { calculateFib, suffixOf } from '../functions/math';

export default function MathCalcFib({ count, increment }) {
  const fib = useMemo(() => calculateFib(count), [count]);

  return (
    <div>
      <h2>Nth fib</h2>
      <p>
        The <strong>{suffixOf(count)}</strong> number in the Fibonacci sequence
        is <strong>{fib}</strong>
      </p>
      <button type="button" onClick={increment}>
        Next number
      </button>
    </div>
  );
}

MathCalcFib.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};
