// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot, query } from 'firebase/firestore'
import { firebaseUpdate } from '../components/Cell'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyArjslajB_ixfo0MVvvn1KTQUyi5Y3cstA',
  authDomain: 'my-game-13e9e.firebaseapp.com',
  projectId: 'my-game-13e9e',
  storageBucket: 'my-game-13e9e.appspot.com',
  messagingSenderId: '54224742915',
  appId: '1:54224742915:web:587b6c8f25e256d5a0fc36',
  measurementId: 'G-WGZQ85J9TQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const q = query(collection(db, 'actions'))

export const setActions = async (move, x, y, which) => {
  const actionsRef = collection(db, 'actions')
  await setDoc(doc(actionsRef, 'move(' + ('0000' + move).slice(-4) + ')'), {
    which: which,
    x: x,
    y: y,
    move: move,
  })
}

export const unsub = onSnapshot(q, (querySnapshot) => {
  let which, x, y
  querySnapshot.forEach((doc) => {
    which = doc.data().which
    x = doc.data().x
    y = doc.data().y
  })
  // firebaseUpdate(x, y, which)
})

export const clearActions = async () => {
  let i = 0
  for(i = 1; i < 50; i++){
    await deleteDoc(doc(db, 'actions', `move(${i})`))
  }
}

