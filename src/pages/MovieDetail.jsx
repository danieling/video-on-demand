import React from 'react'
import { useLocation } from 'react-router-dom'

const MovieDetail = () => {
  const {peli} = useLocation().state
  
  return (
    <div>
      <div className='grid place-items-center'>
        <h2 className='text-green-50 text-3xl py-40'>{peli?.title}</h2>
        <iframe 
          src={`https://sbspeed.com/e/${peli?.video}.html`} 
          width='640' height='360' allowFullScreen/>
    </div>
    </div>
  )
}

export default MovieDetail