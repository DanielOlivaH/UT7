import 'regenerator-runtime/runtime';
import React from 'react'
import VozEj1 from './components/VozEj1'
import VozEj2 from './components/VozEj2'
import Gestos from './components/Gestos'
import AR from './components/AR'
import Home from './components/Home'
import ARDaniel from './components/ARDaniel'
import VozTarea2 from './components/VozTarea2'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/vozej1',
        element: <VozEj1 />
      },
      {
        path: '/vozej2',
        element: <VozEj2 />
      },
      {
        path: '/gestos',
        element: <Gestos />
      },
      {
        path: '/ar',
        element: <AR />
      },
      {
        path: '/ardaniel',
        element: <ARDaniel />
      },
      {
        path: '/voztarea2',   // <- minúsculas, sin espacios
        element: <VozTarea2 />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;