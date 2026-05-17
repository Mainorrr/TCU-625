import { Link } from 'react-router-dom';
import { Gamepad2, BookOpen, Info } from 'lucide-react';
import './Home.css';

const CARDS = [
  {
    to: '/juegos',
    iconClass: 'home__card-icon--games',
    Icon: Gamepad2,
    iconColor: '#a8896a',
    name: 'Juegos',
    desc: 'Aprende vocabulario Bribri de forma interactiva con juegos y actividades dinámicas.',
  },
  {
    to: '/diccionario',
    iconClass: 'home__card-icon--dict',
    Icon: BookOpen,
    iconColor: '#5e8a7a',
    name: 'Diccionario',
    desc: 'Explora palabras en Bribri con imágenes, pronunciación en audio y categorías temáticas.',
  },
  {
    to: '/informacion',
    iconClass: 'home__card-icon--info',
    Icon: Info,
    iconColor: '#c8a97e',
    name: 'Información',
    desc: 'Conozca los créditos, objetivos y el equipo detrás de esta aplicación.',
  },
];

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__title">Aprende Bribri</h1>
        <p className="home__subtitle">
          Plataforma digital dedicada al aprendizaje y la preservación de la lengua Bribri de
          Costa Rica. Explore vocabulario, escuche pronunciaciones auténticas y acceda a recursos
          organizados por categorías temáticas.
        </p>
      </section>

      <p className="home__cards-title">Acceda a las secciones de la aplicación</p>
      <div className="home__cards">
        {CARDS.map(({ to, iconClass, Icon, iconColor, name, desc }) => (
          <Link key={to} to={to} className="home__card">
            <div className={`home__card-icon ${iconClass}`}>
              <Icon size={28} color={iconColor} strokeWidth={1.75} />
            </div>
            <p className="home__card-name">{name}</p>
            <p className="home__card-desc">{desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;
