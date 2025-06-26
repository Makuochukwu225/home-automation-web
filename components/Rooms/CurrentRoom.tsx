import { Dialog } from 'radix-ui';
import React, { useState } from 'react'
import { LuHousePlus, LuPlus, LuToggleLeft, LuTrash2, LuX } from 'react-icons/lu';
import AddRoom from './AddRoom';
interface CurrentRoomProps {
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
}
function CurrentRoom({ currentRoom, setCurrentRoom }: CurrentRoomProps) {
  const [addRoom, setAddRoom] = useState(false);
  return (
    <>
    <Dialog.Root open={addRoom} onOpenChange={setAddRoom}>
        <Dialog.Portal >
          <Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-1/2 left-1/2  lg:h-[85vh] max-h-[100dvh] lg:w-[70vw] w-[90vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 hidden text-[18px] font-black">
              All Appliances
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal font-bold hidden ">
              Manage your appliciances here:
            </Dialog.Description>
            <AddRoom/>
            <Dialog.Close asChild>
              <button
                className="absolute right-2.5 top-2.5 inline-flex size-[25px]  items-center justify-center rounded-full  cursor-pointer hover:text-[30px] focus:outline-none"
                aria-label="Close"
              >
                <LuX />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    <div className='scrollbar-hide overflow-y-scroll h-full overflow-hidden w-full'>
      <div className='flex justify-between items-center gap-2 w-fit mb-4'>
        <h2 className="text-lg font-black">{currentRoom}</h2>
        <LuPlus onClick={()=> setAddRoom(true)} size={24} className='text-blue-300 hover:text-blue-600'/>
      </div>
      <div className="bg-blue-950 p-4 rounded-lg">
        <p className="text-sm text-gray-400">Details about the current room will go here.</p>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center p-3  bg-blue-900/50 h-[150px] overflow-hidden rounded-lg relative">
                                <div className='absolute top-2 right-2'>
                                  <LuToggleLeft size={24} className="text-gray-300 hover:text-blue-600 cursor-pointer" />
                                  </div>
                                  <div className='absolute top-2 left-2'>
                                  <LuTrash2 size={20} className="text-gray-300 hover:text-red-600 cursor-pointer" />
                                  </div>
                                <div className='flex-2 flex items-center w-full justify-center'>
                                  <LuHousePlus size={40} className="text-blue-300" />
                                </div>
                                <div className='flex-1 items-center flex flex-col justify-center'> 
                                  <span className="text-gray-200 italic text-lg">Appliance name</span>
                                  <span className="text-xs text-gray-500">Status: OFF</span>
                                </div>
                              </div>
          ))
        }
        </div>
        
        <button onClick={() => setAddRoom(true)}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 absolute bottom-20 right-5"
              >
                <LuPlus size={24} />
              </button>
      </div>
    </div>
    </>
  )
}

export default CurrentRoom