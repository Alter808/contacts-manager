import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { db } from '../firebaseconfig'
import { v4 as uuidv4 } from 'uuid'

//global variables.
const auth = getAuth()

const registerUser = async ({ userName, userEmail, userPassword }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    )
    const docRef = doc(db, 'user-contacts', userCredential.user.uid)
    await setDoc(docRef, {
      userName: userName,
      userEmail: userEmail,
      contacts: [],
      timestamp: serverTimestamp()
    })
    return userCredential
  } catch (error) {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser)
    }
    return error
  }
}

const uploadImage = async (file) => {
  try {
    const storage = getStorage()
    const fileName = `${uuidv4()}-${file.name}`
    const storageRef = ref(storage, `contacts/${fileName}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    return { imageUrl: downloadUrl }
  } catch (error) {
    return error
  }
}

// gets the user-contacts data for current user
const getUserContactsData = async () => {
  const user = auth.currentUser
  const docRef = doc(db, 'user-contacts', user.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    return 'No such document'
  }
}

//adds a new contact to user-contacts
const addContact = async (data) => {
  const user = auth.currentUser
  const docData = await getUserContactsData()
  docData.contacts.push(data)
  try {
    const docRef = doc(db, 'user-contacts', user.uid)
    await setDoc(docRef, docData)
    return true
  } catch (error) {
    return false
  }
}

//update contact list with modified contact data or deleted contacts.
const updateContactsData = async (data) => {
  const user = auth.currentUser
  const docData = await getUserContactsData()
  docData.contacts = data
  try {
    const docRef = doc(db, 'user-contacts', user.uid)
    await setDoc(docRef, docData)
    return true
  } catch (error) {
    console.log(error, data)
    return false
  }
}

const signInEmailPass = async (data) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      data.userEmail,
      data.userPassword
    )
    return user.user
  } catch (error) {
    return error.code
  }
}

const logOut = async () => {
  const res = await signOut(auth)
  return res
}

const getUserProfile = async () => {
  const user = await getUserContactsData()

  return {
    name: user.userName,
    email: auth.currentUser.email
  }
}

const passwordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    return false
  }
}

export {
  registerUser,
  uploadImage,
  addContact,
  signInEmailPass,
  logOut,
  getUserContactsData,
  updateContactsData,
  getUserProfile,
  passwordReset
}
