import dayjs from 'dayjs'
import { useContext } from 'react';
import AppContext from '../AppContext';
import { TrashIcon } from '@heroicons/react/24/solid'

function Day({ day, rowIindex, title}) {
  const { setDateSelected, setShowModal, setSchedule, schedule } = useContext(AppContext);

  function getTodayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-yellow-100 text-yellow-600' : ''
  }

  function getHolidayClass() {
    return title === "" ? '' : 'bg-red-100 text-red-600 text-center'
  }

  function scheduleRemove(index) {
    if(confirm("Are you sure want to remove this schedule ?")) {
      schedule.splice(index, 1)
    }

    localStorage.setItem("savedSchedule", JSON.stringify(schedule))
    setSchedule(schedule)
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
                  <TrashIcon className='w-4' onClick={() => scheduleRemove(schedulesIndex)} />
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