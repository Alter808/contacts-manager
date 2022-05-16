import { useState } from 'react'
import { toast } from 'react-toastify'
import { addContact, uploadImage } from '../services/sevices'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import userImage from '../assets/png/usericon.png'
import Spinner from '../components/Spinner'
function CreateContact() {
  const [formData, setFormData] = useState({
    contactName: '',
    contactMobile: '',
    contactHome: '',
    contactOffice: '',
    contactEmail: '',
    photo: ''
  })

  const navigate = useNavigate()
  //toast options
  const options = {
    autoClose: 1000
  }
  const {
    contactName,
    contactMobile,
    contactHome,
    contactOffice,
    contactEmail,
    photo
  } = formData
  const [localImg, setLocalImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    //if there is an image file upload it to firebase storage and gets the url.
    setLoading(true)
    let respImg = ''
    if (photo) {
      respImg = await uploadImage(photo)
      if (!respImg.imageUrl) {
        setFormData((prevState) => ({
          ...prevState,
          photoUrl: respImg.imageUrl
        }))
      }
    }
    const finalDoc = {
      contactId: uuidv4(),
      contactName,
      contactMobile,
      contactHome,
      contactOffice,
      contactEmail,
      photoUrl: photo ? respImg.imageUrl : '',
      favorite: false
    }

    //Save the new contact to firebase DB
    const docRef = await addContact(finalDoc)
    if (docRef) {
      toast.success('Contact Added', options)
    } else {
      toast.error('Error Adding contact', options)
    }
    setLoading(false)
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleImage = (e) => {
    setFormData((prevState) => ({ ...prevState, photo: e.target.files[0] }))
    let localImgUrl = URL.createObjectURL(e.target.files[0])
    setLocalImg(localImgUrl)
  }
  return (
    <div className='px-5 py-1 flex flex-col items-center bg-slate-50 h-screen w-full'>
      {loading && <Spinner message='Creating contact...' />}
      <p className='text-xl font-bold mt-4 animate-fadeintext'>
        Create Contact
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-3 w-full max-w-md animate-fadein'>
        <div className='mx-auto mb-2'>
          <div className='bg-slate-400 px-4 py-4 rounded-lg shadow-lg text-center w-36 mx-auto'>
            <div className='mb-3'>
              <img
                className='w-20 h-20 mx-auto rounded-full object-cover object-center'
                src={localImg ? localImg : userImage}
                alt='Avatar Upload'
              />
            </div>
            <label className='cursor-pointer'>
              <span className='leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full'>
                Select Photo
              </span>
              <input
                type='file'
                className='hidden'
                accept='.jpg,.png,.jpeg'
                onChange={handleImage}
              />
            </label>
          </div>
        </div>

        <div className='md:flex md:items-center mb-3'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-full-name'>
              Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='contactName'
              type='text'
              placeholder='Name'
              required
              value={contactName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-3'>
          <div className='md:w-1/3'>
            <label
              className='block font-bold md:text-right mb-1 md:mb-0 pr-4  text-gray-500'
              htmlFor='inline-full-name'>
              Email
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='contactEmail'
              type='email'
              placeholder='Home phone number'
              value={contactEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-3'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-full-name'>
              Mobile #
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-gray-700'
              id='contactMobile'
              type='text'
              placeholder='Mobile phone number'
              value={contactMobile}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-3'>
          <div className='md:w-1/3'>
            <label
              className='block font-bold md:text-right mb-1 md:mb-0 pr-4 text-gray-500'
              htmlFor='inline-full-name'>
              Home Phone
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='contactHome'
              type='text'
              placeholder='Home phone number'
              value={contactHome}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-3'>
          <div className='md:w-1/3'>
            <label
              className='block font-bold md:text-right mb-1 md:mb-0 pr-4 text-gray-500'
              htmlFor='inline-full-name'>
              Office Phone
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='contactOffice'
              type='text'
              placeholder='Home phone number'
              value={contactOffice}
              onChange={handleChange}
            />
          </div>
        </div>
        <div></div>
        <div className='md:flex md:items-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <button className='shadow bg-purple-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
              Save
            </button>

            <button
              type='button'
              className='ml-5 shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-400'
              onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateContact
