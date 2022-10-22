import { useEffect, useState } from 'react';
import '../styles/globals.css'
import AppContext from "../AppContext";
import dayjs from 'dayjs';

function MyApp({ Component, pageProps }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());
  const [showModal, setShowModal] = useState(false);
  const [dateSelected, setDateSelected] = useState(dayjs());
  const [schedule, setSchedule] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState({})

  function initSchedule() {
    const storageSchedule = localStorage.getItem("savedSchedule");
    const parsedSchedule = storageSchedule ? JSON.parse(storageSchedule) : [];
    return parsedSchedule;
  }

  useEffect(() => {
    if(!localStorage.getItem("savedSchedule")) {
      localStorage.setItem("savedSchedule", JSON.stringify([]))
    } else {
      setSchedule(initSchedule())
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        year,
        setYear,
        showModal,
        setShowModal,
        dateSelected,
        setDateSelected,
        schedule,
        setSchedule,
        selectedSchedule,
        setSelectedSchedule
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
