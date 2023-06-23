import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useFilterForm = () => {
  const { payment_from: pay_from, payment_to: pay_to, profession: prof } = useSelector(state => state.filter.filter);

  const [profession, setProfession] = useState('')
  const [payment_from, setPayment_from] = useState('')
  const [payment_to, setPayment_to] = useState('')
  const [validError, setValidError] = useState(false);

  const isPaymentValid = (payment_from && payment_to && (+payment_to >= +payment_from)) || !(payment_from && payment_to)

  useEffect(() => {
    setProfession(prof)
    setPayment_from(pay_from)
    setPayment_to(pay_to)
  }, [prof, pay_from, pay_to])

  useEffect(() => {
    validatePayment()
  }, [payment_from, payment_to])

  const validatePayment = () => isPaymentValid ? setValidError(false) : setValidError(true)

  return {
    profession,
    setProfession,
    payment_from,
    payment_to,
    validError,
    setPayment_from,
    setPayment_to
  }
}

export default useFilterForm;
