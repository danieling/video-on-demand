import { db } from '../firebase'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  orderBy, 
  startAfter,
  limit, 
  updateDoc,
  arrayRemove,
  arrayUnion} from 'firebase/firestore'
import { async } from '@firebase/util'

export async function traerPeliPorId(peli_id) {
  const docRef = doc(db, "pelis", peli_id)
  const docSnap = await getDoc(docRef)
  if(docSnap.exists()){
    return docSnap.data()
  } else {
    return undefined
  }
}

export async function traerPelisEstreno() {
  const q = query(collection(db, 'pelis'), orderBy('release_date', 'desc'), limit(10))
  const qs = await getDocs(q)
  const pelis = []
  qs.forEach((doc) => {
    pelis.push(doc.data())
  })
  return pelis
}

var lasti = null;
export async function traerCatalogo() {
  const pelis = []
  const q = query(collection(db, 'pelis'), 
            orderBy('title'), startAfter(lasti), limit(15))
  const qs = await getDocs(q)
  qs.forEach((doc) => {
    pelis.push(doc)
    lasti = doc
  })
  return pelis
}

export async function traerPelisPorGenero(genero) {
  const pelis = []
  const q = query(collection(db, 'pelis'), 
    where('id', '>=', Math.random() * (900000 - 1000) + 1000),
    where('genre_ids', 'array-contains', genero), 
    orderBy('id'), limit(10))
  const qs = await getDocs(q)
  qs.forEach((peli) => {
    pelis.push(peli.data())
  })
  return pelis
}

export async function traerFeatured() {
  let featured = {}
  const q = query(collection(db, 'pelis'),
    where('id', '>=', Math.random() * (930000 - 1000) + 1000),
      limit(1))
  const qs = await getDocs(q)
  qs.forEach((peli) => {
    featured = peli.data()
  })

  return featured
}

export async function traerPorTitulo(titulo) {
  const pelis = []
  const q = query(collection(db, 'pelis'), 
            where('titleAsArray', 'array-contains', titulo), limit(15))
  const qs = await getDocs(q)
  qs.forEach((peli) => {
    pelis.push(peli.data())
  })
  return pelis
}




export async function traerTodo() {
  const q = query(collection(db, 'pelis'))
  const qs = await getDocs(q)
  qs.forEach((doc) => {
    update(getArrTitle(doc.data()), doc.id)
  })
}

function getArrTitle(peli){
  const dict = new Map()
  dict.set('á', 'a')
  dict.set('é', 'e')
  dict.set('í', 'i')
  dict.set('ó', 'o')
  dict.set('ú', 'u')
  dict.set('¿', '')
  dict.set('?', '')
  dict.set('¡', '')
  dict.set('!', '')
  dict.set(':', '')
  dict.set('(', '')
  dict.set(')', '')
  const arrTitle = new Set()
  let title = peli.title ? peli.title.toLowerCase() : ''
  let origina_title = peli.original_title ? peli.original_title.toLowerCase() : ''

  dict.forEach((v, k) => {
    title = title.replaceAll(k, v)
    origina_title = origina_title.replaceAll(k, v)
  })

  for(let i = 1; i < title.length + 1; i++){
    arrTitle.add(title.substring(0, i))
  }

  for(let i = 1; i < origina_title.length + 1; i++){
    arrTitle.add(origina_title.substring(0, i))
  }

  title = title.trim().split(/\s+/);
  origina_title = origina_title.trim().split(/\s+/);

  title.map(w => {
    for(let i = 1; i < w.length + 1; i++){
      arrTitle.add(w.substring(0, i))
    }
  })

  origina_title.map(w => {
    for(let i = 1; i < w.length + 1; i++){
      arrTitle.add(w.substring(0, i))
    }
  })
  
  return Array.from(arrTitle)
}

async function update(arrTitle, docID) {
  const q = doc(db, 'pelis', docID)
  await updateDoc(q, {
    titleAsArray: arrTitle
  })
}

export async function incrementViewCounter(idPeli){
  const country = JSON.parse(window.localStorage.getItem('country'))
  const q = doc(db, 'pelis', idPeli.toString())
  const ref = await getDoc(q)
  const views = ref.data().views_from

  for(let i = 0; i < views.length; i++){
    if(views[i].country == country){
      views[i].times_played = views[i].times_played + 1
      break
    }
    if(country && views.length == i + 1)
      views.push({country: country, times_played: 0})
  }

  await updateDoc(q, {
    views_from: views
  })
}


// TMDB
// SIMILAR
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=b6d93d8b64690d625f7d20528fe7ddd6&language=es-US&page=1
//IMAGES
//https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=b6d93d8b64690d625f7d20528fe7ddd6&language=es-US
//GENRE LIST where('fruits', arrayContains: 'banana')
//https://api.themoviedb.org/3/genre/movie/list?api_key=b6d93d8b64690d625f7d20528fe7ddd6&language=es-US