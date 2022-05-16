import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Explore from './Pages/Explore'
import Profile from './Pages/Profile'
import CreateContact from './Pages/CreateContact'
import SignIn from './Pages/SignIn'
import PrivateRoute from './components/PrivateRoute'
import Register from './Pages/Register'
import Favorites from './Pages/Favorites'
import EditContact from './Pages/EditContact'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Explore />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/create-contact' element={<PrivateRoute />}>
            <Route path='/create-contact' element={<CreateContact />} />
          </Route>
          <Route path='/edit-contact/' element={<PrivateRoute />}>
            <Route
              path='/edit-contact/:contactName'
              element={<EditContact />}
            />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
        <NavBar />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
