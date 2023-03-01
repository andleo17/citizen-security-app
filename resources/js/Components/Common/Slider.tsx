import DriverIcon from "@/Icons/DriverIcon";
import { useEffect, useState } from "react";

interface SliderProps {
  maxValue: number;
  onSlideEnd: Function;
  className?: string;
}

function Slider({ maxValue, onSlideEnd, className }: SliderProps) {
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
      className={"appearance-none pullee " + className}
      value={value}
      min={0}
      max={maxValue}
      onChange={(e) => setValue(Number(e.target.value))}
      onMouseDown={() => handleSlideEnter()}
      onMouseUp={() => handleSlideLeave()}
      onTouchStart={() => handleSlideEnter()}
      onTouchEnd={() => handleSlideLeave()}
    />
  );
}

export default Slider;
