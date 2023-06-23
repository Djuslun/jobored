import { NumberInput } from '@mantine/core';
import InputNumberControls from './inputNumberControls/InputNumberControls';

const CustomInputNumber = ({ placeholder, value, onChange, data }) => {

  const handleIncrement = () => {
    !value && onChange(0);
    onChange(value => value + 1000)
  }

  const handleDecrement = () => {
    !value && onChange(0);
    if (value > 1000) {
      onChange(value => value - 1000)
    } else {
      onChange('')
    }
  }

  return (
    <NumberInput
      data-elem={data}
      min={0}
      step={1000}
      value={value}
      onChange={onChange}
      rightSection={<InputNumberControls
        inc={handleIncrement} dec={handleDecrement}
      />}
      placeholder={placeholder}
    />
  )
}

export default CustomInputNumber