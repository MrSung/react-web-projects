import React, { useState } from 'react';
import MathCalcFib from './MathCalcFib';
import MathCalcPrime from './MathCalcPrime';

export default function MathCalc() {
  const [fibCount, setFibCount] = useState(1);
  const [primeCount, setPrimeCount] = useState(1);

  const handleAdd10 = () => {
    setFibCount((c) => c + 10);
    setPrimeCount((c) => c + 10);
  };

  const handleReset = () => {
    setFibCount(1);
    setPrimeCount(1);
  };

  return (
    <>
      <hr />
      <button type="button" onClick={handleAdd10}>
        Add 10
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <hr />
      <MathCalcFib
        count={fibCount}
        increment={() => setFibCount((c) => c + 1)}
      />
      <MathCalcPrime
        count={primeCount}
        increment={() => setPrimeCount((c) => c + 1)}
      />
    </>
  );
}
