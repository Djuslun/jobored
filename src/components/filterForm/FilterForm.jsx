import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import CustomInputNumber from './customInputNumber/CustomInputNumber';
import CustomSelect from './customSelect/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSet, filtersReset } from '../../redux/filtersSlice';
import './filterForm.scss'

const FilterForm = () => {
  const dispatch = useDispatch()
  const { payment_from: pay_from, payment_to: pay_to, profession: prof } = useSelector(state => state.filter.filter)

  const [profession, setProfession] = useState('')
  const [payment_from, setPayment_from] = useState('')
  const [payment_to, setPayment_to] = useState('')
  const [validError, setValidError] = useState(false);

  const isPaymentValid = (payment_from && payment_to && (+payment_to >= +payment_from)) || !(payment_from && payment_to)

  useEffect(() => {
    setProfession(prof)
    setPayment_from(pay_from)
    setPayment_to(pay_to)
    setValidError(false)
  }, [prof, pay_from, pay_to])

  useEffect(() => {
    validatePayment()
  }, [payment_from, payment_to])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isPaymentValid) {
      dispatch(filtersSet({ profession, payment_from, payment_to }))
    }
  }

  const handleReset = () => dispatch(filtersReset())

  const validatePayment = () => isPaymentValid ? setValidError(false) : setValidError(true)

  const formProps = {
    handleSubmit,
    handleReset,
    profession,
    payment_from,
    payment_to,
    setProfession,
    setPayment_from,
    setPayment_to,
    validError
  }

  return (
    <>
      <View {...formProps} />
    </>
  )
}

export default FilterForm

const View = ({ handleSubmit, handleReset, profession, payment_from, payment_to, setProfession, setPayment_from, setPayment_to, validError }) => {
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
      <Numbers
        payment_from={payment_from}
        payment_to={payment_to}
        setPayment_from={setPayment_from}
        setPayment_to={setPayment_to} />
      <Button type='submit' data-elem="search-button" >Применить</Button>
      {validError && <ValidError />}
    </form>
  )
}

const ValidError = () => {
  return (
    <div className='invalid'>Проверьте оклад. Оклад 'До' должен быть выше чем 'От' </div>
  )
}

const Numbers = ({ payment_from, payment_to, setPayment_from, setPayment_to }) => {
  return (
    <div className="form__filter filter">
      <p className='filter__title'>Оклад</p>
      <CustomInputNumber
        placeholder={'От'}
        value={payment_from}
        onChange={setPayment_from}
        data={'salary-from-input'} />
      <CustomInputNumber
        placeholder={'До'}
        value={payment_to}
        onChange={setPayment_to}
        data={'salary-to-input'} />
    </div>
  )
}