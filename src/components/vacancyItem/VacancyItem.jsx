import './vacancyItem.scss'

const VacancyItem = ({ currency, payment_from, payment_to, profession, type_of_work, town }) => {
  const salary = `з/п ${payment_from ? `от ${payment_from}` : ''} ${payment_to ? `до ${payment_to}` : ''} ${currency}`

  return (
    <li className="vacancy">
      <div className='vacancy__title-box'>
        <h3 className="vacancy__title">{profession}</h3>
        <span className="vacancy__favorite"></span>
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