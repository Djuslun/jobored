import { ReactComponent as ArrowDown } from '../../assets/arrowDown.svg'
import './selectArrow.scss'

const SelectArrow = ({ opened }) => {
  const className = opened ? 'up' : 'down';

  return (
    <ArrowDown className={`arrow ${className}`} />
  )
}
export default SelectArrow