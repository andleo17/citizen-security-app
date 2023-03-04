import { useEffect, useState } from "react";

function useSound(url: string) {
  const [audio, setAudio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);
  const [windowFocused, setWindowFocused] = useState(false);

  function play() {
    if (!windowFocused) return;

    audio.muted = false;
    audio.play();
  }

  function pause() {
    audio.muted = false;
    audio.pause();
  }

  useEffect(() => {
    audio.loop = true;
    audio.muted = true;

    function handleFocusIn() {
      setWindowFocused(true);
    }

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      pause();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) play();
    else pause();
  }, [isPlaying, windowFocused]);

  return setPlaying;
}

export default useSound;
