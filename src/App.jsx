import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Series from './pages/Series'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 hidden>netflix disney+ star+ paramount+ ViX Prime Video HBO Max America TvGO Peliculas online latino</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buscar' element={<SearchPage />} />
        <Route path='/favoritos' element={<Favorites />} />
        <Route path='/pelis' element={<Movies />} />
        <Route path='/pelis/:title/:id' element={<MovieDetail />} />
        <Route path='/series' element={<Series />} />
        <Route path='/series/:title/:id' element={<Series />} />
      </Routes>
    </div>
  )
}

export default App
