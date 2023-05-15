import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoriteVacancyToggle } from "../../redux/vacanciesSlice";
import classNames from "classnames";
import { ReactComponent as Star } from "../../assets/star.svg"
import './vacancyItem.scss'

const VacancyItem = ({ currency, payment_from, payment_to, profession, type_of_work, town, id }) => {
  const dispatch = useDispatch()

  const { favoriteIDs } = useSelector(store => store.vacancies)

  const isFavorite = favoriteIDs.includes(id)

  const favoriteClass = classNames("vacancy__favorite", { favorite: isFavorite })

  const salary = (payment_from || payment_to)
    ? `з/п ${payment_from ? `от ${payment_from}` : ''} ${payment_to ? `до ${payment_to}` : ''} ${currency}`
    : 'з/п не указана'

  return (
    <li className="vacancy">
      <div className='vacancy__title-box'>
        <Link to={`/vacancy/${id}`}>
          <h3 className="vacancy__title">{profession}</h3>
        </Link>
        <Star className={favoriteClass} width={22} height={22} onClick={() => dispatch(favoriteVacancyToggle(id))} />
      </div>
      <div className='vacancy__salary-box'>
        <p className='vacancy__salary'>{salary}</p>
        <p className='vacancy__employment'>{type_of_work}</p>
      </div>
      <p className="vacancy__location">{town}</p>
    </li>
  )
}

export default VacancyItem