import { devList } from '@/constants/structure'
import React, {useState} from 'react'
import { LuToggleLeft, LuToggleRight } from 'react-icons/lu'


function Frequent() {
  const [isOn, setIson] = useState(false)
  const handleToggle = ()=>{
    setIson(!isOn)
  }
  
  return (
    <>
    <section className='w-full px-2'>
      <h2 className="font-black text-lg ">Frequently used:</h2>
          <div className="justify-evenly space-y-2  mb-5 mt-2 md:grid grid-cols-2 md:gap-2">
        {
          devList.map((items, index) => {
            return (
              <div key={index} className="h-20 w-full rounded-2xl bg-gray-900 text-white flex gap-2 items-center justify-center overflow-hidden">
                <div className=" flex-1 h-full flex items-center justify-center">
                  {items.icon}
                </div>
                <div className="w-[60%]">
                  <p className="text-lg font-bold uppercase">{items.device}</p>
                <p className="text-sm text-[#a3a3a3]">Status: ON</p>
                </div>
                <div className="h-full w-[15%] ">
                  <div onClick={handleToggle} className="w-fit h-fit">
                    {isOn ? <LuToggleLeft size={40} color="red" className=" cursor-pointer active:text-white/30" />: <LuToggleRight size={40} color="green" className=" cursor-pointer active:text-white/30" />}
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
    </section>
    </>
  )
}

export default Frequent