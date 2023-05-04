import arrow from '../../assets/arrowDown.svg'
import './inputNumberControl.scss'
const InputNumberControls = ({ inc, dec }) => {

  return (
    <div className="control">
      <img src={arrow} alt="" className='control__inc' onClick={inc} width={10} />
      <img src={arrow} alt="" className='control__dec' onClick={dec} width={10} />
    </div>
  )
}
export default InputNumberControls