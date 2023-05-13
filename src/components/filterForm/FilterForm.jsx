import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import CustomInputNumber from '../customInputNumber/CustomInputNumber';
import CustomSelect from '../customSelect/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSet, filtersReset } from '../../redux/vacanciesSlice';
import './filterForm.scss'

const FilterForm = () => {
  const dispatch = useDispatch()
  const { payment_from: pay_from, payment_to: pay_to, profession: prof } = useSelector(state => state.vacancies.filters)

  const [profession, setProfession] = useState('')
  const [payment_from, setPayment_from] = useState('')
  const [payment_to, setPayment_to] = useState('')

  useEffect(() => {
    setProfession(prof)
    setPayment_from(pay_from)
    setPayment_to(pay_to)
  }, [prof, pay_from, pay_to])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(filtersSet({ profession, payment_from, payment_to }))
  }

  const handleReset = () => dispatch(filtersReset())

  return (
    <View
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      profession={profession}
      payment_from={payment_from}
      payment_to={payment_to}
      setProfession={setProfession}
      setPayment_from={setPayment_from}
      setPayment_to={setPayment_to} />
  )
}

export default FilterForm

const View = ({ handleSubmit, handleReset, profession, payment_from, payment_to, setProfession, setPayment_from, setPayment_to }) => {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className="form__title-box">
        <h2 className='form__title'>Фильтры</h2>
        <p className='form__reset' onClick={handleReset}>Сбросить все х</p>
      </div>
      <label className="form__filter filter">
        <p className='filter__title'>Отрасль</p>
        <CustomSelect
          onSearchChange={setProfession}
          value={profession} />
      </label>
      <div className="form__filter filter">
        <p className='filter__title'>Оклад</p>
        <CustomInputNumber placeholder={'От'} value={payment_from} onChange={setPayment_from} />
        <CustomInputNumber placeholder={'До'} value={payment_to} onChange={setPayment_to} />
      </div>
      <Button type='submit'>Применить</Button>
    </form>
  )
}