import SearchingMan from '../../assets/SearcingMan.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import './favoriteEmptyState.scss'

const FavoriteEmptyState = () => {

  return (
    <div className='favorite-empty'>
      <img className='favorite-empty__image' src={SearchingMan} alt="SearchingMan" width={240} height={230} />
      <p className='favorite-empty__text'>Упс, здесь еще ничего нет!</p>
      <Link to={'/vacancy'}>
        <Button className='favorite-empty__button'>Поиск Вакансий</Button>
      </Link>
    </div>
  )
}

export default FavoriteEmptyState