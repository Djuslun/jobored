import logo from '../../../assets/Union.svg'
import './logo.scss'

const Logo = () => {

  return (
    <div className='logo'>
      <img className='logo__image' src={logo} alt="logo" />
      <h1 className='logo__title'>Jobored</h1>
    </div>
  )
}
export default Logo