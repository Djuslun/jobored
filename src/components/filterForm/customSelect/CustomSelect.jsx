import { useState } from 'react';
import { useSelector } from 'react-redux';
import SelectArrow from './selectArrow/SelectArrow';
import { Select } from '@mantine/core';

const CustomSelect = ({ onSearchChange, value }) => {
  const [opened, setOpened] = useState(false);
  const options = useSelector(state => state.appReducer.catalogues)

  const handleChange = (profession) => {
    onSearchChange(profession)
  }

  return (
    <Select
      data-elem="industry-select"
      opened={opened ? 1 : 0}
      onDropdownOpen={() => setOpened(true)}
      onDropdownClose={() => setOpened(false)}
      placeholder='Выберете отрасль'
      data={options}
      rightSection={<SelectArrow opened={opened} />}
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