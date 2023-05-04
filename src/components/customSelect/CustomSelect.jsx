import { useState, useEffect } from 'react';
import SelectArrow from '../selectArrow/SelectArrow';
import { Select } from '@mantine/core';


const CustomSelect = ({ }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/', {
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
      }
    })
      .then(data => data.json())
      .then(setData)
  }, [])

  const options = data.map(item => item.title_rus)

  return (
    <Select
      placeholder='Выберете отрасль'
      data={options}
      rightSection={<SelectArrow />}
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