import { useState, useEffect } from 'react';
import { Input, Button } from '@mantine/core';
import './customInput.scss'
import searchIcon from '../../assets/Search.svg'
import { useDispatch, useSelector } from 'react-redux';
import { keywordsSet } from '../../redux/vacanciesSlice';

const CustomInput = ({ }) => {
  const [keywords, setKeywords] = useState('');
  const dispatch = useDispatch()
  const { keywords: keywordsValue } = useSelector(state => state.vacancies.filters)

  useEffect(() => {
    setKeywords(keywordsValue)
  }, [keywordsValue])

  const styles = {
    wrapper: {
      marginBottom: 16,
    },
    input: {
      border: '1px solid #eaebed',
      borderRadius: 8,
      height: 48
    },
    rightSection: {
      marginRight: 32
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(keywordsSet(keywords))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
        icon={<SearchIcon />}
        placeholder="Введите название вакансии"
        rightSection={<Button type='submit'>Поиск</Button>}
        styles={styles}
      />
    </form>
  )
}

export default CustomInput


const SearchIcon = () => {
  return <img src={searchIcon} alt="icon" />
}
