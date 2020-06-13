import React, { useState, useRef, useEffect } from 'react';
import heading from '../config/heading';

export default function ClickGame() {
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(10);
  const timerId = useRef(null);

  const clearTimer = () => clearInterval(timerId.current);
  const handleSetCount = () => {
    if (timer === 0) return;
    setCounter((c) => c + 1);
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearTimer();
    }
  }, [timer]);

  return (
    <>
      <h1>{heading.clickGame}</h1>
      <button type="button" onClick={handleSetCount}>
        Click!
      </button>
      <ul>
        <li>Timer: {timer}</li>
        <li>Counter: {counter}</li>
      </ul>
    </>
  );
}
