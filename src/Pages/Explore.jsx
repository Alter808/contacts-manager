import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingButton from '../components/FloatingButton'
import { getUserContactsData, updateContactsData } from '../services/sevices'
import ContactCard from '../components/ContactCard'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import Dialog from '../components/Dialog'

const getUserDoc = async () => {
  const userDoc = await getUserContactsData()
  return userDoc
}

function Explore() {
  //get the user document in this state
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [dialog, setDialog] = useState({
    message: '',
    showDialog: false,
    contactName: '',
    contactId: ''
  })
  //toast options
  const options = {
    autoClose: 1000
  }
  const setContactList = (contactList) => {
    //
    contactList.sort((a, b) => a.contactName.localeCompare(b.contactName))
    setContacts(contactList)
  }
  useEffect(() => {
    const getUserContacts = async () => {
      setLoading(true)
      const userData = await getUserDoc()
      setContactList(userData.contacts)
      setLoading(false)
    }

    getUserContacts()
  }, [])

  const handleDialog = (message, showDialog, contactName, contactId) => {
    setDialog({
      message,
      showDialog,
      contactName,
      contactId
    })
  }

  const handleDelete = (contactId) => {
    //Update
    const index = contacts.findIndex((p) => p.contactId === contactId)

    handleDialog(
      'Are you sure you want to delete?',
      true,
      contacts[index].contactName,
      contactId
    )
    // idProductRef.current = id
  }

  const deleteContact = async (confirm, contactId) => {
    if (confirm) {
      setLoadingDelete(true)
      //filters the element to return a new array without the given id
      const res = contacts.filter((el) => {
        return el.contactId !== contactId
      })

      //updates the document with the new filtered array
      const deleted = await updateContactsData(res)
      if (deleted) {
        const userData = await getUserDoc()
        setContactList(userData.contacts)
        toast.success('Contact deleted!!', options)
      } else {
        toast.error('Error deleting contact try later', options)
      }
    }
    setLoadingDelete(false)
    handleDialog('', false, '', '')
  }

  const navigate = useNavigate()

  const createContact = () => {
    navigate('/create-contact')
  }

  const handleChange = async (e) => {
    //filter the contact arry with the search value
    const res = contacts.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(e.target.value.toLowerCase())
    )
    // if search value is none gets all contacts
    // else apply the filtered array to the state.
    if (e.target.value === '') {
      const userData = await getUserDoc()
      setContactList(userData.contacts)
    } else {
      setContactList(res)
    }
  }

  const contactList = (
    <div className='pb-20 container flex flex-col space-y-4 justify-center items-center'>
      {contacts.map((contact, index) => {
        return (
          <ContactCard
            key={index}
            contact={contact}
            handleDelete={(contactId) => handleDelete(contactId)}
          />
        )
      })}
    </div>
  )

  return (
    <>
      <FloatingButton
        createContact={() => createContact()}
        bgColor='bg-blue-600'
        hovFocusColor='bg-blue-700'
        activeColor='bg-blue-800'
        textColor='text-white'
      />

      <div className='flex justify-center'>
        {loading && <Spinner message='loading Contacts' />}
        {loadingDelete && <Spinner message='Deleting Contact' />}
        <div className='w-full px-1 fixed z-10 bg-white p-2'>
          <p className='text-xl font-bold mb-2 text-center animate-fadeintext'>
            Contacts
          </p>
          <div className='w-80 mx-auto animate-slider'>
            <input
              type='search'
              id='search'
              onChange={handleChange}
              placeholder='Type to search'
              className='w-full px-3 py-1.5 text-base font-normal bg-slate-800 
                    bg-clip-padding border border-solid border-gray-300 rounded 
                    transition ease-in-out m-0 text-white
                    focus:border-blue-600 focus:outline-none placeholder-white'
            />
          </div>
        </div>
        <div className='mt-24'> {contactList}</div>
      </div>
      {dialog.showDialog && (
        <Dialog
          //Update
          contactName={dialog.contactName}
          deleteContact={deleteContact}
          message={dialog.message}
          contactId={dialog.contactId}
        />
      )}
    </>
  )
}

export default Explore
