import userImage from '../assets/png/usericon.png'
import { ReactComponent as EditIcon } from '../assets/svg/editicon.svg'
import { ReactComponent as TrashIcon } from '../assets/svg/trashicon.svg'
import { useNavigate } from 'react-router-dom'

function ContactCard({ contact, handleDelete }) {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col bg-white w-full items-center px-2 rounded-xl shadow border cursor-pointer animate-fadein'>
      <div className='flex'>
        <div className='relative flex items-center space-x-4'>
          <img
            src={contact.photoUrl ? contact.photoUrl : userImage}
            alt='My profile'
            className='w-16 h-16 rounded-full object-cover'
          />
          {/* <span className='absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white'></span> */}
        </div>
        <div className='flex-grow p-3'>
          <div className='font-semibold text-gray-700'>
            {contact.contactName}
          </div>
          <a
            href={`mailto:${contact.contactEmail}`}
            target='_blank'
            className='text-sm mb-1 underline text-blue-500'
            rel='noreferrer'>
            {contact.contactEmail}
          </a>
          {contact.contactHome && (
            <div className='text-sm text-gray-500'>
              <span className='font-semibold'>Home #: </span>
              {contact.contactHome}
            </div>
          )}
          {contact.contactMobile && (
            <div className='text-sm text-gray-500'>
              <span className='font-semibold'>Mobile #: </span>
              {contact.contactMobile}
            </div>
          )}
          {contact.contactOffice && (
            <div className='text-sm text-gray-500'>
              <span className='font-semibold'>Office #: </span>
              {contact.contactOffice}
            </div>
          )}
        </div>
      </div>
      <div className='p-2 flex flex-row gap-3'>
        <div className='h-8 w-8 bg-green-400 rounded-full bottom-0 right-0 mb-2 flex items-center justify-center'>
          <EditIcon
            onClick={() =>
              navigate(`/edit-contact/${contact.contactName}`, {
                state: { contact: contact }
              })
            }
            className='h-5 w-5 text-gray-50'
          />
        </div>
        <div className='h-8 w-8 bg-red-400 rounded-full bottom-0 right-0 mb-2 flex items-center justify-center'>
          <TrashIcon
            className='h-5 w-5 text-gray-50'
            onClick={() => handleDelete(contact.contactId)}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactCard
