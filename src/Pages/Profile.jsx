import { logOut, getUserProfile, passwordReset } from '../services/sevices'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const doLogout = async (navigate) => {
  await logOut()
  navigate('/sign-in')
}

function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserProfile()
      setProfile(user)
    }
    getUser()
  }, [])

  //toast options
  const options = {
    autoClose: 1000
  }

  const changePass = () => {
    const res = passwordReset(profile.email)
    if (res) {
      toast.success('Reset password mail sent please check your email', options)
    } else {
      toast.error('oops something went wrong try again later', options)
    }
  }

  return (
    <div className='py-2 justify-center flex flex-col'>
      <div className='flex px-3 justify-end'>
        <button
          onClick={() => doLogout(navigate)}
          className='text-white shadow-xl bg-purple-700 hover:bg-purple-800 
                    focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 
                    text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700
                    animate-slider'>
          Logout
        </button>
      </div>
      <p className='text-xl font-bold mt-8 text-center animate-fadeintext'>
        My Profile
      </p>
      <div className='flex justify-center mt-4 animate-fadein'>
        <div className='rounded-md shadow-xl bg-slate-100 px-4 py-1 '>
          <div className='flex flex-row gap-2 mb-3 items-baseline'>
            <p className='tex-lg font-semibold'>Email:</p>
            <p className='text-lg'>{profile.email}</p>
          </div>
          <div className='flex flex-row gap-2 mb-3 items-baseline'>
            <p className='tex-lg font-semibold'>Name:</p>
            <p className='text-lg'>{profile.name}</p>
          </div>
        </div>
      </div>
      <p
        onClick={changePass}
        className='text-center mt-4 text-blue-500 cursor-pointer animate-slider'>
        Click Here to change password
      </p>
    </div>
  )
}

export default Profile
