import { useMemo } from "react";
import secciones from "../../assets/bribri_words/secciones.json";
import recetario from "../../assets/bribri_words/recetario.json";
import { getImage } from "../Pronunciation/assetMaps.js";
import "./Games.css";

function Games() {
  // Categorías de la página de inicio, mapeadas a las imágenes de la página de Pronunciación.
  // AQUÍ SÍ se incluye la categoría "Aleatorio" (en Pronunciación se excluye).
  const categorias = useMemo(
    () =>
      secciones.map((c) => ({
        ...c,
        iconSrc: c.imagen ? getImage(c.imagen) : null,
      })),
    [],
  );
  const gruposIlustraciones = useMemo(
    () =>
      secciones
        .filter((categoria) => categoria.nombre !== "Aleatorio")
        .map((categoria) => ({
          ...categoria,
          palabras: (recetario[categoria.nombre] ?? [])
            .filter((palabra) => palabra.imagen && getImage(palabra.imagen))
            .slice(0, 6),
        })),
    [],
  );
  const collage = useMemo(
    () =>
      gruposIlustraciones
        .flatMap((grupo) => grupo.palabras)
        .map((palabra, index) => ({ ...palabra, index }))
        .slice(0, 20),
    [gruposIlustraciones],
  );

  return (
    <main className="games">
      <header className="games__header">
        <h1 className="games__title">Alimentos Bribri</h1>
        <p className="games__intro">
          Seleccione una categoría para practicar sus conocimientos. Puede
          utilizar la pestaña de Pronunciación como apoyo para estudiar.
        </p>
      </header>

      <section className="games__categories" aria-label="Categorías">
        <div className="games__grid">
          {categorias.map((c) => (
            <button
              key={c.nombre}
              type="button"
              className="games__card"
              aria-label={c.nombreBribri}
            >
              {c.iconSrc ? (
                <img
                  src={c.iconSrc}
                  alt={c.nombre}
                  className="games__card-icon"
                />
              ) : (
                <div
                  className="games__card-icon games__card-icon--placeholder"
                  aria-hidden="true"
                />
              )}
              <div className="games__card-body">
                <span className="games__card-name">{c.nombreBribri}</span>
                <span className="games__card-pct">0%</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="games__hero" aria-label="Alimentos y animales Bribri">
        <span className="games__landscape games__landscape--back" aria-hidden="true" />
        <span className="games__landscape games__landscape--front" aria-hidden="true" />
        <div className="games__collage" aria-hidden="true">
          {collage.map((palabra) => (
            <img
              key={`${palabra.imagen}-${palabra.index}`}
              className="games__floating"
              src={getImage(palabra.imagen)}
              alt=""
              loading="lazy"
              style={{
                "--delay": `${-0.37 * palabra.index}s`,
                "--left": `${10 + (palabra.index % 5) * 20 + (palabra.index % 2 ? 3 : -3)}%`,
                "--top": `${19 + Math.floor(palabra.index / 5) * 20 + (palabra.index % 3) * 2}%`,
                "--size": `${58 + ((palabra.index * 13) % 35)}px`,
                "--tilt": `${(palabra.index % 2 ? 1 : -1) * (8 + (palabra.index % 5) * 3)}deg`,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Games;
