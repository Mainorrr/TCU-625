const imageModules = import.meta.glob('../../assets/images/*.png', { eager: true, import: 'default' });
const audioModules = import.meta.glob('../../assets/audio/*.{mp3,wav}', { eager: true, import: 'default' });

export const getImage = (name) => {
  if (!name) return null;
  return imageModules[`../../assets/images/${name}.png`] ?? null;
};

export const getAudio = (name) => {
  if (!name) return null;
  return (
    audioModules[`../../assets/audio/${name}.mp3`] ??
    audioModules[`../../assets/audio/${name}.wav`] ??
    null
  );
};

export const errorSound = audioModules['../../assets/audio/windows_error_sound.mp3'];
