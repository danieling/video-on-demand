import React, { useEffect, useState } from 'react'
import Feature from '../components/Feature'
import Movie from '../components/Movie'
import Row from '../components/Row'
import requests from '../core/requests'
import { incrementViewCounter, traerCatalogo, traerPeliPorId, traerPelisPorGenero, traerPorTitulo } from '../core/Traidor'
import { useLocalStorage } from '../core/useLocalStorage'

const Home = () => {
  const [text, setText] = useLocalStorage('text', '')
  const [counter, setCounter] = useLocalStorage('counter', 0)

  const [catalogo, setCatalogo] = useState([])

  const fetchCatalogo = () => {
    Promise.resolve(traerCatalogo(catalogo.length > 0 ? catalogo.slice(-1).pop() : null))
      .then((arrList) => {
        arrList.forEach((peli) => {
          setCatalogo(catalogo => [...catalogo, peli])
        })
      })
      catalogo.forEach((p,i) => {
      })
  }

  const fetchPorTitulo = (titulo) => {
    Promise.resolve(traerPorTitulo(titulo)).then((arrList) => {
      arrList.forEach((peli, i) => {
        
      })
    })
  }

//const [p, setP] = useState({})
  useEffect(() => {
    //fetchComedias()
    //fetchCatalogo()
    //fetchPorTitulo('Texas')
    //incrementViewCounter('100042')
    
    // Promise.resolve(traerPeliPorId('10007')).then((peli) => {
    //   setP(peli)
    // })
  }, []);

  return (
    <div>
      <Feature />
      <Row rowId={35} title='Comedias' />
      <Row rowId={16} title='Animación' />
      <Row rowId={10749} title='Romance' />
      <Row rowId={27} title='Terror' />
      <Row rowId={10751} title='En Familia' />
      <Row rowId={28} title='Acción' />
    </div>
  )
}

export default Home