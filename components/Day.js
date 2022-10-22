import dayjs from 'dayjs'

function Day({ day, rowIindex, title }) {

  function getTodayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-yellow-100 text-yellow-600' : ''
  }

  function getHolidayClass() {
    return title === "" ? '' : 'bg-red-100 text-red-600 text-center'
  }

  return (
    <div className={`days ${getTodayClass()} ${getHolidayClass()}`}>
      <header>
        {rowIindex === 0 && (
          <p className='days-title'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className='days-date'>{day.format('DD')}</p>
      </header>
      <main className='mt-4'>
        {title}
      </main>
    </div>
  )
}

export default Day