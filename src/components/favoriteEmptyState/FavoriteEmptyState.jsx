import SearchingMan from '../../assets/SearcingMan.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

const FavoriteEmptyState = ({ }) => {

  return (
    <>
      <img src={SearchingMan} alt="SearchingMan" width={240} height={230} />
      <p>Упс, здесь еще ничего нет!</p>
      <Link to={'/'}>
        <Button>Поиск Вакансий</Button>
      </Link>
    </>
  )
}

export default FavoriteEmptyState