import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './components/root';
import Comments from './components/comments';
import Posts from './components/posts';
import Users from './components/users';
import Dashboard from './components/Dashboard';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} >
        
        <Route index element={<Dashboard />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />

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
