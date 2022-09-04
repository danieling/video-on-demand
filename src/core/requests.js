const llavepeli = import.meta.env.VITE_APP_LLAVE_PELIS
const base_url = import.meta.env.VITE_TMDB

const requests = {
  popular: `${base_url}/movie/popular?api_key=${llavepeli}&language=es-US&page=1`,
  apip: import.meta.env.VITE_APP_IP_API
}

export default requests