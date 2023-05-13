import { Pagination } from '@mantine/core';


const Vacancies = ({ children, currentPage, total, setCurrentPage }) => {

  return (
    <>
      {children}
      <Pagination
        value={currentPage}
        total={total}
        position="center"
        onChange={setCurrentPage}
      />
    </>
  )
}

export default Vacancies