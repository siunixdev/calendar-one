import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { XMarkIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs';
import styles from '../styles/Modal.module.css'

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
    <div className={styles.overlay}>
      <form className={styles.modal}>
        <header className={styles.modalHeader}>
          <span className={styles.headerTitle}>
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
          <div className="grid items-end gap-y-7">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              required
              className={`text-xl font-semibold ${styles.formInput}`}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <p>{dateSelected.format("dddd, MMMM DD")}</p>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              required
              className={styles.formInput}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
        <footer className={styles.modalFooter}>
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