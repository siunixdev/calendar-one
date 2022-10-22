import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { XMarkIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs';
import styles from '../styles/Modal.module.css'

function ScheduleModal() {
  const { setShowModal, dateSelected, setDateSelected, schedule, setSchedule, selectedSchedule, setSelectedSchedule } = useContext(AppContext);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function handleSubmit() {
    if (Object.entries(selectedSchedule).length !== 0) {
      const schedulesIndex = schedule.findIndex(s => s.id === selectedSchedule.id)
      schedule.splice(schedulesIndex, 1)
    }

    localStorage.setItem("savedSchedule", JSON.stringify([...schedule, {
      'id': dayjs().unix(),
      'title': title,
      'date': dateSelected.format('YYYY-MM-DD'),
      'desc': description
    }]))

    setSchedule([...schedule, {
      'id': dayjs().unix(),
      'title': title,
      'date': dateSelected.format('YYYY-MM-DD'),
      'desc': description
    }])

    setTitle("")
    setDescription("")
    setShowModal(false)
    setSelectedSchedule({})
  }

  function handleRemove() {
    if (confirm("Are you sure want to delete this schedule ?")) {
      if (Object.entries(selectedSchedule).length !== 0) {
        const schedulesIndex = schedule.findIndex(s => s.id === selectedSchedule.id)
        schedule.splice(schedulesIndex, 1)

        setSchedule(schedule)
        localStorage.setItem("savedSchedule", JSON.stringify(schedule))
      }

      setTitle("")
      setDescription("")
      setShowModal(false)
      setSelectedSchedule({})
    }
  }

  useEffect(() => {
    if (Object.entries(selectedSchedule).length !== 0) {
      setTitle(selectedSchedule.title)
      setDescription(selectedSchedule.desc)
    }
  }, [selectedSchedule, selectedSchedule.desc, selectedSchedule.title])

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <span className={styles.headerTitle}>
            Schedule
          </span>
          <div>
            <button onClick={() => {
              setDateSelected(dayjs())
              setShowModal(false)
              setSelectedSchedule({})
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
          <div>
            {Object.entries(selectedSchedule).length !== 0 && (
              <button onClick={handleRemove} className="button-danger">
                Delete
              </button>
            )}
          </div>
          <button
            className="button-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ScheduleModal