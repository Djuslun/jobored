import { useState, useEffect, useRef } from 'react';
import { Input, Button } from '@mantine/core';
import './customInput.scss'
import searchIcon from '../../assets/Search.svg'
import { useDispatch, useSelector } from 'react-redux';
import { keywordsSet } from '../../redux/vacanciesSlice';

const CustomInput = () => {
  const [keywords, setKeywords] = useState('');
  const dispatch = useDispatch()
  const { keywords: keywordsValue } = useSelector(state => state.vacancies.filters)
  const buttonRef = useRef(null)

  useEffect(() => {
    setKeywords(keywordsValue)
  }, [keywordsValue])

  const styles = {
    wrapper: {
      marginBottom: 16,
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(keywordsSet(keywords))
  }

  return (
    <form className='form-keywords' onSubmit={handleSubmit}>
      <Input
        data-elem="search-input"
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
        icon={<SearchIcon />}
        placeholder="Введите название вакансии"
        rightSection={<Button ref={buttonRef} type='submit' data-elem="search-button">Поиск</Button>}
        rightSectionWidth={buttonRef.current ? buttonRef.current.offsetWidth : undefined}
        styles={styles}
      />
    </form>
  )
}

export default CustomInput


const SearchIcon = () => {
  return <img src={searchIcon} alt="icon" />
}
