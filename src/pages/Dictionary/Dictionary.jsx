import { useMemo, useRef, useState } from 'react';
import secciones from '../../assets/bribri_words/secciones.json';
import recetario from '../../assets/bribri_words/recetario.json';
import { getImage, getAudio } from './assetMaps.js';
import './Dictionary.css';

const PAGE_SIZE = 12;

function NoAudioIcon({ shaking = false }) {
  return (
    <svg
      className={
        'dictionary__audio-icon dictionary__audio-icon--off' +
        (shaking ? ' dictionary__audio-icon--shaking' : '')
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
        'dictionary__audio-icon dictionary__audio-icon--on' +
        (playing ? ' dictionary__audio-icon--playing' : '')
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

function getPageItems(current, total) {
  const delta = 1;
  const pages = [];
  for (let i = 0; i < total; i++) {
    if (
      i === 0 ||
      i === total - 1 ||
      (i >= current - delta && i <= current + delta)
    ) {
      pages.push(i);
    }
  }

  const items = [];
  let prev;
  for (const i of pages) {
    if (prev !== undefined) {
      if (i - prev === 2) {
        items.push(prev + 1);
      } else if (i - prev > 2) {
        items.push(`gap-${prev}`);
      }
    }
    items.push(i);
    prev = i;
  }
  return items;
}

function Pagination({ pagina, totalPaginas, setPagina, className = '' }) {
  return (
    <div className={`dictionary__pagination ${className}`}>
      <button
        type="button"
        className="dictionary__page-nav"
        onClick={() => setPagina((p) => Math.max(0, p - 1))}
        disabled={pagina === 0}
        aria-label="Página anterior"
      >
        ‹
      </button>
      {getPageItems(pagina, totalPaginas).map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="dictionary__page-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={
              'dictionary__page-btn' +
              (item === pagina ? ' dictionary__page-btn--active' : '')
            }
            onClick={() => setPagina(item)}
            aria-label={`Página ${item + 1}`}
            aria-current={item === pagina ? 'page' : undefined}
          >
            {item + 1}
          </button>
        )
      )}
      <span className="dictionary__page-status" aria-live="polite">
        {pagina + 1} / {totalPaginas}
      </span>
      <button
        type="button"
        className="dictionary__page-nav"
        onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
        disabled={pagina >= totalPaginas - 1}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </div>
  );
}

function Dictionary() {
  const [seccion, setSeccion] = useState(secciones[0].nombre);
  const [pagina, setPagina] = useState(0);
  const [playingIds, setPlayingIds] = useState(new Set());
  const [shakingId, setShakingId] = useState(null);
  const playingCounts = useRef(new Map());
  const shakeTimerRef = useRef(null);

  const palabras = useMemo(() => recetario[seccion] ?? [], [seccion]);
  const totalPaginas = Math.max(1, Math.ceil(palabras.length / PAGE_SIZE));
  const palabrasPagina = useMemo(
    () => palabras.slice(pagina * PAGE_SIZE, pagina * PAGE_SIZE + PAGE_SIZE),
    [palabras, pagina]
  );

  const handleSeccionChange = (e) => {
    setSeccion(e.target.value);
    setPagina(0);
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
    <main className="dictionary">
      <h1>Diccionario</h1>

      <div className="dictionary__header">
        <label className="dictionary__selector">
          <span className="dictionary__selector-label">Categoría</span>
          <span className="dictionary__select-wrapper">
            <select value={seccion} onChange={handleSeccionChange}>
              {secciones.map((s) => (
                <option key={s.nombre} value={s.nombre}>
                  {s.nombreBribri}
                </option>
              ))}
            </select>
          </span>
        </label>
        {palabras.length > 0 && (
          <Pagination
            pagina={pagina}
            totalPaginas={totalPaginas}
            setPagina={setPagina}
            className="dictionary__pagination--top"
          />
        )}
      </div>

      {palabras.length === 0 ? (
        <p className="dictionary__empty">No hay palabras en esta sección.</p>
      ) : (
        <>
          <div className="dictionary__grid">
            {palabrasPagina.map((p, i) => {
              const imgSrc = getImage(p.imagen);
              const audioSrc = getAudio(p.audio);
              const id = `${seccion}-${pagina}-${i}`;
              return (
                <button
                  key={id}
                  type="button"
                  className="dictionary__card"
                  onClick={() => reproducir(audioSrc, id)}
                >
                  {audioSrc ? (
                    <AudioIcon playing={playingIds.has(id)} />
                  ) : (
                    <NoAudioIcon shaking={shakingId === id} />
                  )}
                  {imgSrc ? (
                    <img className="dictionary__image" src={imgSrc} alt={p.nombre} />
                  ) : (
                    <div className="dictionary__placeholder">Sin imagen</div>
                  )}
                  <span className="dictionary__name">{p.nombre}</span>
                </button>
              );
            })}
          </div>

          <Pagination
            pagina={pagina}
            totalPaginas={totalPaginas}
            setPagina={setPagina}
            className="dictionary__pagination--bottom"
          />
        </>
      )}

    </main>
  );
}

export default Dictionary;
