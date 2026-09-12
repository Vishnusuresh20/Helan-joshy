// Shared Audio Singleton to guarantee single audio stream and synchronized UI across unboxing & main page
let globalAudio: HTMLAudioElement | null = null;
const stateListeners = new Set<(playing: boolean) => void>();

const notifyListeners = (isPlaying: boolean) => {
  stateListeners.forEach((fn) => fn(isPlaying));
};

export const getIsMusicPlaying = () => {
  return globalAudio ? !globalAudio.paused : false;
};

export const startGlobalMusic = () => {
  if (!globalAudio) {
    globalAudio = new Audio("/music.mp3");
    globalAudio.loop = true;
    globalAudio.volume = 0.65;
  }
  globalAudio
    .play()
    .then(() => notifyListeners(true))
    .catch((err) => console.warn("Audio play prevented:", err));
};

export const pauseGlobalMusic = () => {
  if (globalAudio) {
    globalAudio.pause();
    notifyListeners(false);
  }
};

export const toggleGlobalMusic = () => {
  if (!globalAudio) {
    startGlobalMusic();
    return;
  }
  if (globalAudio.paused) {
    startGlobalMusic();
  } else {
    pauseGlobalMusic();
  }
};

export const subscribeMusicState = (callback: (playing: boolean) => void) => {
  stateListeners.add(callback);
  return () => {
    stateListeners.delete(callback);
  };
};
