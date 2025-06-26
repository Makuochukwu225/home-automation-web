import React from 'react'

function RegisterForm() {
  return (
    <div className=" h-full w-full flex items-center lg:justify-start justify-center">
      <div className='flex-1 overflow-hidden h-full hidden lg:block'>
        <img src="/auth-image.png" alt='auth-png' className='object-cover h-full w-full'/>
      </div>
      <div className='w-full min-h-[50vh] max-h-[900px] lg:max-w-2xl max-w-md bg-blue-950 lg:bg-inherit p-6 rounded-lg lg:shadow-sm shadow-gray-800 flex flex-col justify-center items-start mx-4 border-gray-800 lg:border'>
        <h1 className='text-2xl font-bold'>Registration Form</h1>
        <p className='text-sm text-[#a3a3a3] mb-4 font-black'>Please enter your credentials to register.</p>
      <form className='flex-1 w-full p-3'>
        <div className='flex flex-col mb-4'>
          <label htmlFor="fullname">Name:</label>
          <input type="text" id="fullname" name="fullname" placeholder='Enter your name here' required className='focus:outline-0 border border-blue-600 rounded p-2'/>
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder='Enter your email here' required className='focus:outline-0 border border-blue-600 rounded p-2'/>
        </div>
        <div  className='flex flex-col mb-4'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder='Enter your password here' required className='focus:outline-0 border border-blue-600 rounded p-2'/>
        </div>
        <button type="submit" className='bg-blue-700 hover:bg-blue-600 h-10 text-[14px] hover:text-[15px] hover:p-2.5 p-2 rounded '>Register</button>
      </form>
      </div>
    </div>
  )
}

export default RegisterForm