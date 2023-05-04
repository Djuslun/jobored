import { useState } from 'react';
import { NumberInput } from '@mantine/core';
import InputNumberControls from '../inputNumberControls/InputNumberControls';

const CustomInputNumber = ({ placeholder }) => {
  const [value, setValue] = useState('')

  const handleIncrement = () => {
    !value && setValue(0);
    setValue(value => value + 1000)
  }

  const handleDecrement = () => {
    !value && setValue(0);
    if (value > 1000) {
      setValue(value => value - 1000)
    } else {
      setValue('')
    }
  }

  return (
    <NumberInput
      min={0}
      step={1000}
      value={value}
      onChange={setValue}
      rightSection={<InputNumberControls inc={handleIncrement} dec={handleDecrement} />}
      placeholder={placeholder}
    />
  )
}
export default CustomInputNumber