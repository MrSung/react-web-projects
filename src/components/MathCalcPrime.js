import React from 'react';
import PropTypes from 'prop-types';

import { calculatePrime, suffixOf } from '../functions/math';

export default function MathCalcPrime({ count, increment }) {
  const prime = React.useMemo(() => calculatePrime(count), [count]);

  return (
    <div className="container">
      <h2>Nth Prime</h2>
      <p>
        The <strong>{suffixOf(count)}</strong> prime number is{' '}
        <strong>{prime}</strong>.
      </p>
      <button type="button" onClick={increment}>
        Next prime
      </button>
    </div>
  );
}

MathCalcPrime.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};
