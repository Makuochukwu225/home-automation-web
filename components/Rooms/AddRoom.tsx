import React from 'react'

function AddRoom() {
  return (
    <div className='w-full h-full flex-col flex items-start justify-center gap-4 '>
    <h1 className='font-bold text-xl'>Add Appliance</h1>
    <form  className='w-full'>
      <div className='flex flex-col mb-4'>
          <label htmlFor="applianceName">Appliance name:</label>
          <input type="text" id="applianceName" name="applianceName" placeholder='Enter appliance name here' required className='focus:outline-0 border border-blue-600 rounded p-2'/>
        </div>
        
    </form>
    </div>
  )
}

export default AddRoom