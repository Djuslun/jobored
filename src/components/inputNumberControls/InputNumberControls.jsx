import { ReactComponent as Arrow } from '../../assets/arrowDown.svg'
import './inputNumberControl.scss'
const InputNumberControls = ({ inc, dec }) => {

  return (
    <div className="control">
      <Arrow className='control__inc' onClick={inc} width={10} />
      <Arrow className='control__dec' onClick={dec} width={10} />
    </div>
  )
}
export default InputNumberControls