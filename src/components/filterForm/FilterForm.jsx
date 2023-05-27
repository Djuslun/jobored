import { Button } from '@mantine/core';
import CustomInputNumber from './customInputNumber/CustomInputNumber';
import CustomSelect from './customSelect/CustomSelect';
import { useDispatch } from 'react-redux';
import { filtersSet, filtersReset } from '../../redux/filtersSlice';
import useFilterForm from '../../hooks/useFilterForm';
import './filterForm.scss'

const FilterForm = () => {
  const dispatch = useDispatch()

  const {
    profession,
    setProfession,
    payment_from,
    payment_to,
    validError,
    setPayment_from,
    setPayment_to
  } = useFilterForm()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validError) {
      dispatch(filtersSet({ profession, payment_from, payment_to }))
    }
  }

  const handleReset = () => dispatch(filtersReset())

  const formProps = {
    handleSubmit,
    handleReset,
    profession,
    setProfession,
    payment_from,
    payment_to,
    setPayment_from,
    setPayment_to,
    validError
  }

  return (
    <View {...formProps} />
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

const ValidError = () => {
  return (
    <div className='invalid'>Проверьте оклад. Оклад 'До' должен быть выше чем 'От' </div>
  )
}