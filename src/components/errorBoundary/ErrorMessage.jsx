import img from '../../assets/error.gif'

const ErrorMessage = () => {
  return (
    <img style={{ display: 'block', width: '250px', height: '250px', margin: '0 auto', objectFit: 'contain', borderRadius: '50%' }} src={img} alt="error" />
  )
}

export default ErrorMessage