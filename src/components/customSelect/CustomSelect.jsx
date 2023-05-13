import { useSelector } from 'react-redux';
import SelectArrow from '../selectArrow/SelectArrow';
import { Select } from '@mantine/core';

const CustomSelect = ({ onSearchChange, value }) => {

  const options = useSelector(state => state.vacancies.catalogues)

  const handleChange = (profession) => {
    onSearchChange(profession)
  }

  return (
    <Select
      placeholder='Выберете отрасль'
      data={options}
      rightSection={<SelectArrow />}
      value={value}
      onChange={handleChange}
      styles={
        {
          rightSection: {
            pointerEvents: 'none'
          }
        }
      }
    />
  )
}

export default CustomSelect