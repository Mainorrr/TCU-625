import { useMemo, useRef, useState } from 'react';
import secciones from '../../assets/bribri_words/secciones.json';
import recetario from '../../assets/bribri_words/recetario.json';
import { getImage, getAudio } from './assetMaps.js';


function NoAudioIcon({ shaking = false }) {
  return (
    <svg
      className={
        'vocabulary__audio-icon vocabulary__audio-icon--off' +
        (shaking ? ' vocabulary__audio-icon--shaking' : '')
      }
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-label="Sin audio"
      role="img"
    >
      <title>Sin audio</title>
      <path
        fill="currentColor"
        d="M3.28 2.22 2.22 3.28l4.43 4.43L5 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2l4 3.5V12.5l3.5 3.5-1.5 1V18l1.94-1.31 4.78 4.78 1.06-1.06L3.28 2.22ZM12 4.5 9.91 6.09l5.27 5.27a4 4 0 0 0-1.18-3.86V4.5ZM18 12a6 6 0 0 0-1.16-3.55l1.43 1.43A8 8 0 0 1 19 12c0 1.78-.59 3.42-1.59 4.74l1.45 1.45A9.94 9.94 0 0 0 20 12a9.96 9.96 0 0 0-2.71-6.83l-1.43 1.43A8 8 0 0 1 18 12Z"
      />
    </svg>
  );
}

function AudioIcon({ playing = false }) {
  return (
    <svg
      className={
        'vocabulary__audio-icon vocabulary__audio-icon--on' +
        (playing ? ' vocabulary__audio-icon--playing' : '')
      }
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-label="Con audio"
      role="img"
    >
      <title>Con audio</title>
      <path
        fill="currentColor"
        d="M3 10v4a1 1 0 0 0 1 1h3l4 3.5V5.5L7 9H4a1 1 0 0 0-1 1Zm11.5 2A4 4 0 0 0 12.5 8.05v7.9A4 4 0 0 0 14.5 12Zm-2-7.5v2.06A6 6 0 0 1 16.5 12a6 6 0 0 1-4 5.65v2.06A8 8 0 0 0 18.5 12a8 8 0 0 0-6-7.5Z"
      />
    </svg>
  );
}


function Vocabulary() {
  const [seccion, setSeccion] = useState(secciones[0].nombre);
  const [playingIds, setPlayingIds] = useState(new Set());
  const [shakingId, setShakingId] = useState(null);
  const playingCounts = useRef(new Map());
  const shakeTimerRef = useRef(null);

  const palabras = useMemo(() => {
    // If the "Aleatorio" (Todo) section is selected, concatenate the 5 category arrays
    // in the order defined in secciones, preserving internal order of each category.
    if (seccion === 'Aleatorio') {
      return secciones
        .filter((s) => s.nombre !== 'Aleatorio')
        .flatMap((s) => recetario[s.nombre] ?? []);
    }
    return recetario[seccion] ?? [];
  }, [seccion]);
  const palabrasPagina = palabras; // Mostrar todas las palabras en una sola página (sin paginación)


  const handleSeccionChange = (e) => {
    setSeccion(e.target.value);
  };

  const decrementCount = (id) => {
    const count = (playingCounts.current.get(id) ?? 1) - 1;
    if (count <= 0) {
      playingCounts.current.delete(id);
      setPlayingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      playingCounts.current.set(id, count);
    }
  };

  const reproducir = (url, id) => {
    if (!url) {
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      setShakingId(null);
      requestAnimationFrame(() => setShakingId(id));
      shakeTimerRef.current = setTimeout(() => setShakingId(null), 500);
      return;
    }

    const audio = new Audio(url);
    playingCounts.current.set(id, (playingCounts.current.get(id) ?? 0) + 1);
    setPlayingIds((prev) => new Set(prev).add(id));

    audio.play().catch(() => decrementCount(id));
    audio.addEventListener('ended', () => decrementCount(id));
  };

  return (
    <main className="vocabulary">
      <h1>Vocabulario</h1>

      <div className="vocabulary__header">
        <nav className="vocabulary__tabs" role="tablist" aria-label="Categorías">
          {secciones.map((s) => {
            // Prefer explicit imagen field in secciones.json; otherwise fall back to
            // the first palabra's imagen in that category (same logic as cards).
            let iconSrc = null;
            if (s.imagen) iconSrc = getImage(s.imagen);
            if (!iconSrc) {
              // For the special 'Aleatorio' section, find the first real category with an image
              if (s.nombre === 'Aleatorio') {
                const firstCat = secciones.find((x) => x.nombre !== 'Aleatorio');
                if (firstCat) {
                  const firstWord = (recetario[firstCat.nombre] ?? [])[0];
                  if (firstWord) iconSrc = getImage(firstWord.imagen);
                }
              } else {
                const firstWord = (recetario[s.nombre] ?? [])[0];
                if (firstWord) iconSrc = getImage(firstWord.imagen);
              }
            }

            return (
              <button
                key={s.nombre}
                type="button"
                role="tab"
                aria-pressed={seccion === s.nombre}
                className={
                  'vocabulary__tab' + (seccion === s.nombre ? ' vocabulary__tab--active' : '')
                }
                onClick={() => setSeccion(s.nombre)}
              >
                {iconSrc ? (
                  <img src={iconSrc} alt={s.nombre} className="vocabulary__tab-icon" />
                ) : (
                  <div className="vocabulary__tab-icon vocabulary__tab-icon--placeholder" aria-hidden="true" />
                )}
                <span className="vocabulary__tab-label">{s.nombreBribri}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {palabras.length === 0 ? (
        <p className="vocabulary__empty">No hay palabras en esta sección.</p>
      ) : (
        <>
          <div className="vocabulary__grid">
            {palabrasPagina.map((p, i) => {
              const imgSrc = getImage(p.imagen);
              const audioSrc = getAudio(p.audio);
              const id = `${seccion}-${i}`;
              return (
                <button
                  key={id}
                  type="button"
                  className="vocabulary__card"
                  onClick={() => reproducir(audioSrc, id)}
                >
                  {audioSrc ? (
                    <AudioIcon playing={playingIds.has(id)} />
                  ) : (
                    <NoAudioIcon shaking={shakingId === id} />
                  )}
                  {imgSrc ? (
                    <img className="vocabulary__image" src={imgSrc} alt={p.nombre} />
                  ) : (
                    <div className="vocabulary__placeholder">Sin imagen</div>
                  )}
                  <span className="vocabulary__name">{p.nombre}</span>
                </button>
              );
            })}
          </div>

        </>
      )}

    </main>
  );
}

export default Vocabulary;
