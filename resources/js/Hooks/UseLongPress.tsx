import { useState, useRef } from "react";

function useLongPress(callback = () => {}, delay = 300) {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const start = () => {
    setProgress(0);
    timeoutRef.current = setTimeout(() => {
      callback();
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setProgress(0);
    }, delay);
    const increment = (100 * 4.03) / delay;
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + increment);
    });
  };

  const clear = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    progress,
  };
}

export default useLongPress;
