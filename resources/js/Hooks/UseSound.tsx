import { useEffect, useState } from "react";

function useSound(url: string) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setPlaying] = useState(false);
  const [windowFocused, setWindowFocused] = useState(false);

  function play() {
    if (!windowFocused) return;
    if (!audio) return;

    audio.muted = false;
    audio.play();
  }

  function pause() {
    if (!audio) return;

    audio.muted = false;
    audio.pause();
  }

  useEffect(() => {
    const newAudio = new Audio(url);
    newAudio.loop = true;
    newAudio.muted = true;

    setAudio(newAudio);

    function handleFocusIn() {
      setWindowFocused(true);
    }

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      newAudio.muted = true;
      newAudio.pause();
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) play();
    else pause();
  }, [isPlaying, windowFocused]);

  return setPlaying;
}

export default useSound;
