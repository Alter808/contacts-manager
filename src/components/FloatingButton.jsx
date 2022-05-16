import { ReactComponent as AddIcon } from '../assets/svg/addicon.svg'
function FloatingButton(props) {
  return (
    <button
      onClick={() => props.createContact()}
      type='button'
      className={`animate-scaleinbl inline-block rounded-full ${props.bgColor} ${props.textColor} leading-normal 
                uppercase shadow-md hover:${props.hovFocusColor} hover:shadow-2xl focus:${props.hovFocusColor} 
                focus:shadow-lg focus:outline-none focus:ring-0 active:${props.activeColor} active:shadow-lg 
                transition duration-150 ease-in-out w-9 h-9 fixed bottom-20 right-4 z-50`}>
      <AddIcon className='h-6 w-6 mx-auto' />
    </button>
  )
}

export default FloatingButton
