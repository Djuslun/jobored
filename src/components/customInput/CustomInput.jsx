import { Input } from '@mantine/core';
import './customInput.scss'
import searchIcon from '../../assets/Search.svg'

const CustomInput = ({ }) => {

  return (
    <Input
      icon={<SearchIcon />}
      placeholder="Введите название вакансии"
      styles={{
        wrapper: {
          marginBottom: 16,


        },
        input: {
          border: '1px solid #eaebed',
          borderRadius: 8,
          height: 48
        }
      }}
    />
  )
}

export default CustomInput




const SearchIcon = () => {
  return <img src={searchIcon} alt="icon" />
}
