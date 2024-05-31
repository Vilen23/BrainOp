import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Feed from './pages/Feed'

function App() {

  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </div>
  )
}

export default App
