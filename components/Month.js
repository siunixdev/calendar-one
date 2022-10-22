import { useContext } from 'react';
import AppContext from '../AppContext';
import Day from './Day'

function Month({ month, data }) {
  const { schedule } = useContext(AppContext);

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
                <Day day={day} key={idx} rowIindex={i} title={title} schedule={schedule} />
              )
            })
          })
        }
      </div>
    </>
  )
}

export default Month