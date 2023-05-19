import img from '../../assets/error.gif'

const ErrorMessage = () => {
  return (
    <>
      <img style={{ display: 'block', width: '250px', height: '250px', margin: '10px auto', objectFit: 'contain', borderRadius: '50%' }} src={img} alt="error" />
      <p style={{ textAlign: 'center', fontSize: 20 }}>Попробуйте обновить страницу</p>
    </>
  )
}

export default ErrorMessage