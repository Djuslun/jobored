import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoriteVacancyToggle } from "../../redux/vacanciesSlice";
import classNames from "classnames";
import { ReactComponent as Star } from "../../assets/star.svg"
import './vacancyItem.scss'

const VacancyItem = ({ currency, payment_from, payment_to, profession, type_of_work, town, id, isSingleVacancy }) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteIDs } = useSelector(store => store.vacancies)

  useEffect(() => {
    if (favoriteIDs) {
      setIsFavorite(favoriteIDs.includes(id))
    }
  }, [favoriteIDs])



  const favoriteClass = classNames("vacancy__favorite", { favorite: isFavorite })

  const salary = (payment_from || payment_to)
    ? `з/п ${payment_from ? `от ${payment_from}` : ''} ${payment_to ? `до ${payment_to}` : ''} ${currency}`
    : 'з/п не указана'

  const itemTitleStyles = classNames('vacancy__title', { 'vacancy__title--single': isSingleVacancy })
  const itemSalaryStyles = classNames('vacancy__salary', { 'vacancy__salary--single': isSingleVacancy })
  const itemSalaryBoxStyles = classNames('vacancy__salary-box', { 'vacancy__salary-box--single': isSingleVacancy })

  return (
    <li className="vacancy">
      <div className='vacancy__title-box'>
        <Link to={`/vacancy/${id}`}>
          <h3 className={itemTitleStyles}>{profession}</h3>
        </Link>
        <Star className={favoriteClass} width={24} height={24} onClick={() => dispatch(favoriteVacancyToggle(id))} />
      </div>
      <div className={itemSalaryBoxStyles}>
        <p className={itemSalaryStyles}>{salary}</p>
        <p className='vacancy__employment'>{type_of_work}</p>
      </div>
      <p className="vacancy__location">{town}</p>
    </li>
  )
}

export default VacancyItem