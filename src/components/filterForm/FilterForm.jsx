import { Button } from '@mantine/core';
import CustomInputNumber from '../customInputNumber/CustomInputNumber';
import CustomSelect from '../customSelect/CustomSelect';
import './filterForm.scss'

const FilterForm = () => {

  return (
    <form className='form'>
      <div className="form__title-box">
        <h2 className='form__title'>Фильтры</h2>
        <p className='form__reset'>Сбросить все х</p>
      </div>
      <div className="form__filter filter">
        <p className='filter__title'>Отрасль</p>
        <CustomSelect />
      </div>
      <div className="form__filter filter">
        <p className='filter__title'>Оклад</p>
        <CustomInputNumber placeholder={'От'} />
        <CustomInputNumber placeholder={'До'} />
      </div>
      <Button >Применить</Button>
    </form>
  )
}

export default FilterForm