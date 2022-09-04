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

export async function traerCatalogo(last) {
  const pelis = []
  const q = query(collection(db, 'pelis'), 
            orderBy('title'), startAfter(last), limit(10))
  const qs = await getDocs(q)
  qs.forEach((doc) => {
    pelis.push(doc)
  })
  return pelis
}

export async function traerPelisPorGenero(genero, last) {
  const pelis = []
  const q = query(collection(db, 'pelis'), 
    where('genre_ids', 'array-contains', genero),
          orderBy('title'),startAfter(last), limit(10))
  const qs = await getDocs(q)
  qs.forEach((peli) => {
    pelis.push(peli)
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
            where('titleAsArray', 'array-contains', titulo))
  const qs = await getDocs(q)
  qs.forEach((peli) => {
    pelis.push(peli.data())
  })
  return pelis
}




async function traerTodo() {
  const q = query(collection(db, 'pelis'))
  const qs = await getDocs(q)
  qs.forEach((doc) => {
    update(getArrTitle(doc.data()), doc.id)
  })
}

function getArrTitle(peli){
  const arrTitle = []
  const title = peli.title ? peli.title.toLowerCase() : ''
  const origina_title = peli.original_title ? peli.original_title.toLowerCase() : ''
  for(let i = 1; i < title.length + 1; i++){
    arrTitle.push(title.substring(0, i))
  }
  for(let i = 1; i < origina_title.length + 1; i++){
    arrTitle.push(origina_title.substring(0, i))
  }

  return arrTitle
}

async function update(arrTitle, docID) {
  const q = doc(db, 'pelis', docID)
  await updateDoc(q, {
    titleAsArray: arrTitle
  })
}

export async function incrementViewCounter(idPeli){
  const country = window.localStorage.getItem('country')
  const q = doc(db, 'pelis', idPeli)
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