import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './components/root.jsx';
import Posts from './components/posts.jsx';
import Homepage from './components/homepage.jsx';
import Post from './components/post.jsx';
import Works from './components/works.jsx';
import Contact from './components/contact.jsx';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} >

        <Route index element={<Homepage />} />
        <Route path='works' element={<Works />} />
        <Route path='blog' element={<Posts />} />
        <Route path='/blog/:id' element={<Post />} />
        <Route path='contact' element={<Contact />} />
    
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
