// Gather common image extensions so getImage can accept names with or without extension
const imageModulesPng = import.meta.glob('../../assets/images/*.png', { eager: true, import: 'default' });
const imageModulesJpg = import.meta.glob('../../assets/images/*.jpg', { eager: true, import: 'default' });
const imageModulesJpeg = import.meta.glob('../../assets/images/*.jpeg', { eager: true, import: 'default' });
const imageModulesSvg = import.meta.glob('../../assets/images/*.svg', { eager: true, import: 'default' });

// Merge all image module maps into one lookup
const imageModules = {
  ...imageModulesPng,
  ...imageModulesJpg,
  ...imageModulesJpeg,
  ...imageModulesSvg,
};

const audioModules = import.meta.glob('../../assets/audio/*.{mp3,wav}', { eager: true, import: 'default' });

export const getImage = (name) => {
  if (!name) return null;
  // If name includes an extension, try it directly
  const hasExt = /\.[a-zA-Z0-9]+$/.test(name);
  if (hasExt) {
    const key = `../../assets/images/${name}`;
    return imageModules[key] ?? null;
  }
  // Try common extensions
  const exts = ['.png', '.jpg', '.jpeg', '.svg'];
  for (const ext of exts) {
    const key = `../../assets/images/${name}${ext}`;
    if (imageModules[key]) return imageModules[key];
  }
  // Fallback: try to find a module whose basename matches the name (robust against slight mismatches)
  const basenameMatch = Object.entries(imageModules).find(([k]) => k.endsWith(`/` + name) || k.endsWith(`/` + name + '.png'));
  return basenameMatch ? basenameMatch[1] : null;
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
