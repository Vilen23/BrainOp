import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Feed from './pages/Feed'
import axios from 'axios'
import Post from './pages/Post'

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='*' element={<div>404</div>}/>
        <Route path='/feed/createPost' element={<Post/>}/>
      </Routes>
    </div>
  )
}

export default App
