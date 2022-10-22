import { useState } from 'react';
import '../styles/globals.css'
import AppContext from "../AppContext";
import dayjs from 'dayjs';

function MyApp({ Component, pageProps }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());

  return (
    <AppContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        year,
        setYear
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
