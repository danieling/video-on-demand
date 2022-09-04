import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { traerFeatured } from '../core/Traidor'

const Feature = () => {
  const [featured, setFeatured] = useState()

  // async function loadMovies() {
  //   const response = await fetch(requests.popular)
  //   const data = await response.json()
  //   setMovies(data.results)
  // }
console.log('feature')
  useEffect(() => {
    Promise.resolve(traerFeatured())
      .then((peli) => {
        setFeatured(peli)
      })
  }, [])

  return (
    <div className='w-full h-[550px] lg:h-[800px] text-white'>
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[800px] bg-gradient-to-r from-black"></div>
        <img className='w-full h-full object-fill' src={ featured?.backdrop_path ? `https://image.tmdb.org/t/p/original/${ featured?.backdrop_path }` 
          : 'https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=720'} alt="Movie Poster" />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h2 className="shadow-black text-3xl md:text-5xl font-bold">{ featured?.title }</h2>
          <div className="my-4">
            <Link 
            to={`/pelis/${featured?.title.replaceAll(' ', '-')}/${featured?.id}`}
            state = {{peli: featured}} >
              <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
            </Link>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">Ver Despues</button>
          </div>
          <p className="text-gray-400 shadow-black text-sm">Released: { featured?.release_date }</p>
          <p className="w-full shadow-black md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{ featured?.overview }</p>
        </div>
      </div>
    </div>
  )
}

export default Feature