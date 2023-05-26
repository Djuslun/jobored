import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { favoritesVacancyToggle } from "../../redux/favoriteSlice";
import classNames from "classnames";
import { ReactComponent as Star } from "../../assets/star.svg"
import './vacancyItem.scss'

const VacancyItem = ({ currency, payment_from, payment_to, profession, type_of_work, town, id, isSingleVacancy }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteIDs } = useSelector(store => store.favorites)

  useEffect(() => {
    if (favoriteIDs) {
      setIsFavorite(favoriteIDs.includes(id))
    }
  }, [favoriteIDs])

  const salary = (payment_from || payment_to)
    ? `з/п ${payment_from ? `от ${payment_from}` : ''} ${payment_to ? `до ${payment_to}` : ''} ${currency}`
    : 'з/п не указана'

  const favoriteClass = classNames("vacancy__favorite", { favorite: isFavorite })
  const itemTitleStyles = classNames('vacancy__title', { 'vacancy__title--single': isSingleVacancy })
  const itemSalaryStyles = classNames('vacancy__salary', { 'vacancy__salary--single': isSingleVacancy })
  const itemSalaryBoxStyles = classNames('vacancy__salary-box', { 'vacancy__salary-box--single': isSingleVacancy })

  const handleFavoriteChange = (event) => {
    event.stopPropagation()
    dispatch(favoritesVacancyToggle(id))
  }

  const handleNavigate = (id) => navigate(`/vacancy/${id}`)

  const vacancyProps = {
    id,
    handleNavigate,
    itemTitleStyles,
    itemSalaryBoxStyles,
    favoriteClass,
    itemSalaryStyles,
    handleFavoriteChange,
    profession,
    salary,
    type_of_work,
    town
  }

  return (
    <>
      <View {...vacancyProps} />
    </>
  )
}

export default VacancyItem

const View = (
  { id,
    handleNavigate,
    itemTitleStyles,
    itemSalaryBoxStyles,
    favoriteClass,
    handleFavoriteChange,
    itemSalaryStyles,
    profession,
    salary,
    type_of_work,
    town }
) => {
  return (<li className="vacancy" data-elem={`vacancy-${id}`} onClick={() => handleNavigate(id)}>
    <div className='vacancy__title-box'>
      <h3 className={itemTitleStyles}>{profession}</h3>
      <Star
        className={favoriteClass}
        onClick={(e) => handleFavoriteChange(e)}
        data-elem={`vacancy-${id}-shortlist-button`} />
    </div>
    <div className={itemSalaryBoxStyles}>
      <p className={itemSalaryStyles}>{salary}</p>
      <p className='vacancy__employment'>{type_of_work}</p>
    </div>
    <p className="vacancy__location">{town}</p>
  </li>
  )
}