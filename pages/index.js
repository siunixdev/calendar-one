import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { getMonth } from '../helpers/helper'
import Month from '../components/Month'
import AppContext from '../AppContext';
import styles from '../styles/Home.module.css'
import Navigation from '../components/Navigation';
import axios from "axios";
import useSWR from "swr";
import ScheduleModal from '../components/ScheduleModal';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, year, showModal, setShowModal } = useContext(AppContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  const address = `https://date.nager.at/api/v3/PublicHolidays/${year}/ID`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  return (
    <div className=''>
      {data && (
        <>
          <Head>
            <title>CalendarOne (Public Holiday)</title>
            <meta name='description' content='CalendarOne' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <main className={styles.calendar}>
            <div className={styles.headerMain}>
              {/* <input type='text' name='' value='' placeholder='Search schedule...' className='p-2 rounded-lg w-full md:w-96 outline-none' /> */}
              <h1 className={styles.title}>CalendarOne</h1>
              <button className='button-primary' onClick={() => setShowModal(true)}>Add New Schedule</button>
            </div>
            <Navigation />
            <Month month={currentMonth} data={data} />
          </main >

          {
            showModal && (
              <ScheduleModal />
            )
          }
        </>
      )}
    </div >
  )
}
