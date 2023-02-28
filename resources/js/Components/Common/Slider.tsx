import { useEffect, useRef, useState } from "react";

interface SliderProps {
  maxValue: number;
  onSlideEnd: Function;
}

function Slider({ maxValue, onSlideEnd }: SliderProps) {
  const [value, setValue] = useState(0);
  const [isSliding, setSliding] = useState(false);

  useEffect(() => {
    if (!isSliding) {
      if (value >= maxValue) {
        onSlideEnd();
      }
      setValue(0);
    }
  }, [value, isSliding]);

  function handleSlideEnter() {
    setSliding(true);
  }

  function handleSlideLeave() {
    setSliding(false);
  }

  return (
    <input
      type="range"
      className="w-full pullee"
      value={value}
      min={0}
      max={maxValue}
      onChange={(e) => {
        const currentValue = Number(e.target.value);
        if (
          (isSliding && currentValue < maxValue * 0.1) ||
          value >= maxValue * 0.09
        )
          setValue(currentValue);
      }}
      onMouseDown={() => handleSlideEnter()}
      onMouseUp={() => handleSlideLeave()}
      onTouchStart={() => handleSlideEnter()}
      onTouchEnd={() => handleSlideLeave()}
    />
  );
}

export default Slider;
