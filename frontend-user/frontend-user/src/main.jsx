import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './components/root.jsx';
import Posts from './components/posts.jsx';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} >

        <Route index element={<Posts />} />
    
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )

};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
