// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhM9eYfMaKeYDUiAyTHxFfu1ffctHU0wE',
  authDomain: 'house-marketplace-app-a275e.firebaseapp.com',
  projectId: 'house-marketplace-app-a275e',
  storageBucket: 'house-marketplace-app-a275e.appspot.com',
  messagingSenderId: '717737831609',
  appId: '1:717737831609:web:3685de0ea132dd0e86bf68'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export { db }
