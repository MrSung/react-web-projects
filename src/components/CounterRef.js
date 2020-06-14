import React, { useState, useRef, useEffect } from 'react';
import heading from '../config/heading';

export default function CounterRef() {
  const [count, setCount] = useState(0);
  const id = useRef(null);
  const clear = () => clearInterval(id.current);

  useEffect(() => {
    id.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clear();
  }, []);

  return (
    <>
      <h1>{heading.counterRef}</h1>
      <p>{count}</p>
      <button type="button" onClick={clear}>
        Stop!
      </button>
    </>
  );
}
