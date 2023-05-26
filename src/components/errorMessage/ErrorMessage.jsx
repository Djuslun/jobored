import img from '../../assets/error.gif'
import './errorMessage.scss'

const ErrorMessage = () => {
  return (
    <div className='error'>
      <img className='error__image' src={img} alt="error" />
      <p className='error__text' >Попробуйте обновить страницу</p>
    </div>
  )
}

export default ErrorMessage