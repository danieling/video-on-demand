import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import requests from '../core/requests';
import styled from 'styled-components'

import { useLocalStorage } from '../core/useLocalStorage'

const Navbar = () => {
  const [country, setCountry] = useLocalStorage('country', '')
  window.addEventListener("contextmenu", e => e.preventDefault());
  function fetchCountry() {
    fetch(requests.apip, {method: 'GET'})
      .then(r => r.json())
      .then(data => setCountry(data.country))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchCountry()
  }, [])

  return (
      <Nav>
      <Logo href='/'>
        <img src="/img/logo.png" alt="peliculiar logo pelis pa culiar" />
      </Logo>
        <NavMenu>
          <Link to='/'>
            <img src="/img/home-icon.svg" alt="HOME" />
            <span>INICIO</span>
          </Link>
          <Link to='/buscar'>
            <img src="/img/search-icon.svg" alt="buscar" />
            <span>BUSCAR</span>
          </Link>
          <Link to='/favoritos'>
            <img src="/img/watchlist-icon.svg" alt="favoritos" />
            <span>MI LISTA</span>
          </Link>
          <Link to='/pelis'>
            <img src="/img/movie-icon.svg" alt="peliculas online" />
            <span>PELÍCULAS</span>
          </Link>
          <Link to='/series'>
            <img src="/img/series-icon.svg" alt="series de tv" />
            <span>SERIES</span>
          </Link>
        </NavMenu>
      </Nav>
  )
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 100px;
  margin-top: 8px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`

const NavMenu = styled.div`
  text-shadow: 1px 1px black;
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 30px;
      min-width: 30px;
      width:30px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 18px;
      padding: 2px 5px;
      letter-spacing: 2px;
      line-height: 1.08;
      white-space: nowrap;
      position: relative;
    
      &:before {
        background-color: rgb(249,249,249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: '';
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none ;
  }
`

export default Navbar