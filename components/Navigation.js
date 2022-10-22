import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs'
import { useContext } from 'react';
import styles from '../styles/Home.module.css'
import AppContext from '../AppContext';

function Navigation() {
  const { monthIndex, setMonthIndex, setYear } = useContext(AppContext);

  function handleToday() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1)
    setYear(dayjs(new Date(dayjs().year(), monthIndex - 1)).format('YYYY'))
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1)
    setYear(dayjs(new Date(dayjs().year(), monthIndex + 1)).format('YYYY'))
  }

  return (
    <div className={styles.headerNav}>
      <div className={styles.dateNavigation}>
        <button className='button-secondary' onClick={() => handleToday()}>
          Today
        </button>
        <button className='button-secondary'
          onClick={() => handlePrevMonth()}
        >
          <ChevronLeftIcon className='w-6' />
        </button>
        <button className='button-secondary'
          onClick={() => handleNextMonth()}
        >
          <ChevronRightIcon className='w-6' />
        </button>
      </div>
      <h1 className={styles.title}>
        {
          dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')
        }
      </h1>
    </div>
  )
}

export default Navigation