import Head from 'next/head'
import Image from 'next/image'
import SocialButton from '../components/SocialButton'

function login() {
  return (
    <div>
      <Head>
      <title>CalendarOne (Public Holiday)</title>
        <meta name='description' content='CalendarOne' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex items-center justify-center min-h-screen p-4 bg-gray-200'>
        <div className='rounded-lg shadow-xl bg-white p-8 md:w-[30rem] text-center py-10'>
          <div>
            <Image alt='google' src='/calendar.svg' width={40} height={40} />
            <h1 className='text-lg font-bold md:text-2xl mt-2'>CalendarOne</h1>
          </div>
          <div className='flex flex-col items-center my-10'>
            <h2 className='text-gray-700'>Login to your Account</h2>
            <p className='text-gray-400'>Login using secial network</p>
            <div className='flex my-6 gap-4'>
              <SocialButton onClick={() => alert('test')} icon='/google.svg' text='github' />
              <SocialButton onClick={() => alert('test')} icon='/github.svg' text='github' />
            </div>
          </div>
          <hr />
          <p className='text-gray-400 mt-4'>TVone Technical Test</p>
        </div>
      </main>
    </div>
  )
}

export default login