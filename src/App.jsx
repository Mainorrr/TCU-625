import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Info from './pages/Info/Info.jsx';
import Games from './pages/Games/Games.jsx';
import Dictionary from './pages/Dictionary/Dictionary.jsx';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout><Home /></Layout>,
    },
    {
      path: '/informacion',
      element: <Layout><Info /></Layout>,
    },
    {
      path: '/juegos',
      element: <Layout><Games /></Layout>,
    },
    {
      path: '/diccionario',
      element: <Layout><Dictionary /></Layout>,
    },
  ],
  { basename: '/TCU-625' }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
