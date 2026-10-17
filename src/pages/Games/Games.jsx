import { useMemo } from "react";
import secciones from "../../assets/bribri_words/secciones.json";
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

  return (
    <main className="games">
      <header className="games__header">
        <h1 className="games__title">Alimentos Bribri</h1>
        <p className="games__intro">
          Seleccione una categoría para practicar sus conocimientos. Puede
          utilizar la pestaña de Pronunciación como apoyo para estudiar.
        </p>
      </header>

      {/* Categorías: van ARRIBA del cuadrado blanco para poder seleccionarlas apenas entrar */}
      <section className="games__categories" aria-label="Categorías">
        <label className="games__categories-label">Categorías</label>
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

      {/* Cuadrado blanco de reemplazo (debajo de las categorías) */}
      <div className="games__hero" aria-label="Portada">
        <div className="games__square" aria-hidden="true" />
      </div>
    </main>
  );
}

export default Games;
