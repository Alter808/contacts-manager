import { useState } from 'react'
import { signInEmailPass } from '../services/sevices'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function SignIn() {
  const [formData, setFormData] = useState({ userEmail: '', userPassword: '' })
  const { userEmail, userPassword } = formData
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const resp = await signInEmailPass(formData)
      if (resp.uid) {
        navigate('/')
      } else if (
        resp === 'auth/wrong-password' ||
        resp === 'auth/user-not-found'
      ) {
        toast.error('wrong credentials')
      } else {
        toast.error('Something went wrong try again later')
      }
      setLoading(false)
    } catch (error) {
      toast.error('Something went wrong try again later')
    }
  }
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className='px-5 py-1 flex flex-col items-center'>
      {loading && <Spinner message='Signing in' />}
      <p className='text-xl font-bold mt-8'>sign in to your account</p>
      <form onSubmit={handleSubmit} className='mt-7 w-full max-w-md'>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-full-name'>
              Email
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='userEmail'
              type='email'
              placeholder='Email'
              value={userEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-password'>
              Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='userPassword'
              type='password'
              placeholder='Password'
              value={userPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <button className='shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
              Sign in
            </button>
          </div>
        </div>
        <div className='md:flex md:items-center justify-center'>
          <div className='md:w-2/3 mt-6 text-center'>
            <Link
              className='underline text-blue-700 hover:text-blue-500 font-semibold'
              to='/Register'>
              Need an account? SIGN UP
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn
