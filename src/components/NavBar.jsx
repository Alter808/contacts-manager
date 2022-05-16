import { ReactComponent as ContactIcon } from '../assets/svg/contacts.svg'
import { ReactComponent as UserIcon } from '../assets/svg/user.svg'
import { useNavigate } from 'react-router-dom'
function NavBar() {
  const navigate = useNavigate()

  return (
    <div className='fixed left-0 bottom-0 right-0 h-16 bg-slate-600 z-40 flex justify-evenly items-center animate-fadein'>
      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => navigate('/')}>
        <ContactIcon className='h-6 w-6 text-gray-200' />
        <p className='text-lg text-gray-200'>Contacts</p>
      </div>

      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => navigate('/profile')}>
        <UserIcon className='h-6 w-6 text-gray-200' />
        <p className='text-lg text-gray-200'>Profile</p>
      </div>
    </div>
  )
}

export default NavBar
