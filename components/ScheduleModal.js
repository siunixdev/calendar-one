import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { XMarkIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs';

function ScheduleModal() {
  const { setShowModal, dateSelected, setDateSelected, schedule } = useContext(AppContext);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function handleSubmit() {
    localStorage.setItem("savedSchedule", JSON.stringify([...schedule, {
      'title': title,
      'date': dateSelected.format('YYYY-MM-DD'),
      'desc': description
    }]))
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-400 bg-opacity-50">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            Schedule {title ? ': ' + title : ''}
          </span>
          <div>
            <button onClick={() => {
              setDateSelected(dayjs())
              setShowModal(false)
              }}>
              <XMarkIcon className='w-6 text-gray-700' />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <p>{dateSelected.format("dddd, MMMM DD")}</p>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            className="button-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  )
}

export default ScheduleModal