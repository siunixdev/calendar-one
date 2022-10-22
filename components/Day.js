import dayjs from 'dayjs'
import { useContext } from 'react';
import AppContext from '../AppContext';

function Day({ day, rowIindex, title, schedule }) {
  const { setDateSelected, setShowModal } = useContext(AppContext);

  function getTodayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-yellow-100 text-yellow-600' : ''
  }

  function getHolidayClass() {
    return title === "" ? '' : 'bg-red-100 text-red-600 text-center'
  }

  return (
    <div className={`days ${getTodayClass()} ${getHolidayClass()}`} onDoubleClick={() => {
      setDateSelected(day)
      setShowModal(true)
    }}>
      <header>
        {rowIindex === 0 && (
          <p className='days-title'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className='days-date'>{day.format('DD')}</p>
      </header>
      <main className='mt-4 relative w-full px-2'>
        {title}
        {
          schedule && schedule.map((s, i) => {
            const schedulesIndex = schedule.findIndex(s => s.date === day.format('YYYY-MM-DD'))
            if(schedulesIndex !== -1 && s.date === day.format('YYYY-MM-DD')) {
              return (
                <div className='badge' key={i}>
                  <p>{s.title}</p>
                </div>
              )
            }
          })
        }
      </main>
    </div>
  )
}

export default Day