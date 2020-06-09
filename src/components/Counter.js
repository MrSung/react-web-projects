import React, { useState, useRef, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const id = useRef(null);
  const clear = () => clearInterval(id.current);

  useEffect(() => {
    id.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clear;
  }, []);

  return (
    <>
      <h1>Counter (useRef sample)</h1>
      <h2>{count}</h2>
      <button type="button" onClick={clear}>
        Stop!
      </button>
    </>
  );
}
