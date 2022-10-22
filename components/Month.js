import Day from './Day'

function Month({ month, data }) {
  return (
    <>
      <div className='month-grid'>
        {
          month.map((row, i) => {
            return row.map((day, idx) => {
              const date = day.format('YYYY-MM-DD')
              const index = data.findIndex(p => p.date === date);

              let title = ""
              if(index !== -1) {
                title = data[index].localName
              }
              return (
                <Day day={day} key={idx} rowIindex={i} title={title} />
              )
            })
          })
        }
      </div>
    </>
  )
}

export default Month