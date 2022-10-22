import dayjs from 'dayjs'
import { useContext } from 'react';
import AppContext from '../AppContext';

function Day({ day, rowIindex, title }) {
  const { setDateSelected, setShowModal, schedule, setSelectedSchedule } = useContext(AppContext);

  function getTodayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-yellow-100 text-yellow-600' : ''
  }

  function getHolidayClass() {
    return title === "" ? '' : 'bg-red-100 text-red-600 text-center'
  }

  function viewDetail(id) {
    const index = schedule.findIndex(s => s.id === id)
    setSelectedSchedule(schedule[index])
    setShowModal(true)
    setDateSelected(dayjs(schedule[index].date))
  }

  return (
    <div className={`days ${getTodayClass()} ${getHolidayClass()}`} onDoubleClick={() => {
      setDateSelected(day)
      setShowModal(true)
    }}>
      <header className='w-full'>
        {rowIindex === 0 && (
          <div className='min-w-full py-1 bg-slate-200'>
            <p className='days-title'>{day.format('dddd')}</p>
          </div>
        )}
        <p className='days-date'>{day.format('DD')}</p>
      </header>
      <main className='mt-4 relative w-full px-2'>
        {
          title && (
            <div className='badge badge-danger'>
              {title}
            </div>
          )
        }
        {
          schedule && schedule.map((s, i) => {
            const schedulesIndex = schedule.findIndex(s => s.date === day.format('YYYY-MM-DD'))
            if (schedulesIndex !== -1 && s.date === day.format('YYYY-MM-DD')) {
              return (
                <div className='badge badge-primary' key={i} onClick={() => viewDetail(s.id)}>
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