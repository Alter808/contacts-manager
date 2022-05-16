function Dialog({ message, deleteContact, contactName, contactId }) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-400 bg-opacity-40 animate-fadein'>
      <div
        className='flex flex-col items-center justify-center 
                    absolute top-1/2 left-1/2 bg-slate-100 
                    -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl'>
        <h3 className='text-gray-900 text-base'>{message}</h3>
        <h1 className='text-gray-900 text-xl'>{contactName}</h1>
        <div className='flex items-center gap-4 mt-2'>
          <button
            onClick={() => deleteContact(true, contactId)}
            className='bg-red-500 px-10 py-2 rounded-md shadow-lg hover:shadow-2xl cursor-pointer'>
            Yes
          </button>
          <button
            onClick={() => deleteContact(false, contactId)}
            className='bg-green-500 px-10 py-2 rounded-md shadow-lg hover:shadow-2xl cursor-pointer'>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
