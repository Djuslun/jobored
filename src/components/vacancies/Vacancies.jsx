import { Pagination } from '@mantine/core';
import './pagination.scss'

const Vacancies = ({ children, currentPage, total, setCurrentPage }) => {

  return (
    <>
      {children}
      <Pagination
        value={currentPage}
        total={total}
        position="center"
        onChange={setCurrentPage}
        size={'lg'}
      />
    </>
  )
}

export default Vacancies