import React from "react";
import { LuHousePlus, LuPlus, LuToggleLeft } from "react-icons/lu";

interface CurrentApplianceProps {
  setAppliance: React.Dispatch<React.SetStateAction<string>>;
  appliance: string;
}

function CurrentAppliance({ setAppliance, appliance}: CurrentApplianceProps) {
  return <div className='scrollbar-hide overflow-y-scroll h-full overflow-hidden w-full'>
    <div className='flex justify-between items-center gap-2 w-fit mb-4'>
            <h2 className="text-lg font-black">{appliance}</h2>
            <LuPlus size={24} className='text-blue-300 hover:text-blue-600'/>
          </div>
    <div className="bg-blue-950 p-4 rounded-lg">
      <p className="text-sm text-gray-400">Details about {appliance} will go here.</p>
      <div className='grid grid-cols-2 gap-4 mt-4'>
                {
                Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center p-3 border border-blue-900 h-[150px] overflow-hidden rounded-lg relative">
                    <div className='absolute top-2 right-2'>
                      <LuToggleLeft size={24} className="text-gray-300 hover:text-blue-600 cursor-pointer" />
                      </div>
                    <div className='flex-2 flex items-center w-full justify-center'>
                      <LuHousePlus size={40} className="text-blue-300" />
                    </div>
                    <div className='flex-1 items-center flex flex-col justify-center'> 
                      <span className="text-gray-200 italic text-lg">Room {index + 1}</span>
                      <span className="text-xs text-gray-500">Status: OFF</span>
                    </div>
                  </div>
                ))
              }
              </div>
      
      
      <button
        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 absolute bottom-20 right-5"
      >
        <LuPlus size={24} />
      </button>
    </div>
  </div>;
}

export default CurrentAppliance;
