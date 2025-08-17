import React from 'react'
import Loading from './Loading.gif'

const Loader = () => {
  return (
    <div className='w-screen  h-screen flex justify-center items-center bg-black'>
      <img src={Loading} alt="Loading..." />
    </div>
  )
}

export default Loader