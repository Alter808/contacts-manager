import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/sevices'

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  })
  //destructure into local variables the formData State
  const { userName, userEmail, userPassword } = formData
  const navigate = useNavigate()
  //handle change of every field in form
  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  //toast options
  const options = {
    autoClose: 1000
  }
  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await registerUser({ userName, userEmail, userPassword })
    if (resp.user) {
      toast.success('User successfully created', options)
      navigate('/')
    } else {
      toast.error('Could not create user please try again later', options)
    }
  }

  return (
    <div className='px-5 py-1 flex flex-col items-center bg-slate-50 h-screen w-full'>
      <p className='text-xl font-bold mt-8'>Create your account</p>
      <form onSubmit={handleSubmit} className='mt-7 w-full max-w-md'>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-full-name'>
              User Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='userName'
              type='text'
              placeholder='Name'
              value={userName}
              onChange={handleChange}
            />
          </div>
        </div>
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
            <button className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
