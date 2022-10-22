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

  console.log(schedule);

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
      <main className='mt-4'>
        {title}
        {
          schedule && schedule.map((s, i) => {
            const schedulesIndex = schedule.findIndex(s => s.date === day.format('YYYY-MM-DD'))
            if(schedulesIndex !== -1 && s.date === day.format('YYYY-MM-DD')) {
              return (
                <p key={i}>{s.title}</p>
              )
            }
          })
        }
      </main>
    </div>
  )
}

export default Day