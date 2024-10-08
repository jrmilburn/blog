import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './components/root';
import Comments from './components/comments';
import Posts from './components/posts';
import Post from './components/post';
import Users from './components/users';
import Dashboard from './components/Dashboard';
import Login from './components/login';
import PrivateRoute from './components/privateroute';
import Register from './components/register';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login setToken={setToken} setUser={setUser} />} />  {/* Login route should not be under PrivateRoute */}
      <Route element={<PrivateRoute token={token} user={user} />}>  {/* PrivateRoute protects only routes that require auth */}
        <Route path='/' element={<Root />}>
          <Route index element={<Dashboard />} />
          <Route path="/posts/:postid/comments" element={<Comments />} />
          <Route path="/posts" element={<Posts user={user}/>} />
          <Route path="/posts/:postid" element={<Post user={user}/>} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
      </>


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
