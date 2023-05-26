import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@mantine/core';
import { keywordsSet } from '../../redux/filtersSlice';
import searchIcon from '../../assets/Search.svg'
import './customInput.scss'

const CustomInput = () => {
  const [keywords, setKeywords] = useState('');
  const dispatch = useDispatch()
  const { keywords: keywordsValue } = useSelector(state => state.filter.filter)
  const buttonRef = useRef(null)

  useEffect(() => {
    setKeywords(keywordsValue)
  }, [keywordsValue])

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
      />
    </form>
  )
}

export default CustomInput

const SearchIcon = () => {
  return <img src={searchIcon} alt="icon" />
}
