import React from 'react'
import { useState } from "react"
import {  LuDoorOpen,  LuEllipsis,  LuX } from "react-icons/lu"
import { Dialog } from "radix-ui";
import AllRooms from './AllRooms';
import { rooms } from '@/constants/structure';
import CurrentRoom from './CurrentRoom';

function RoomOverview() {
  
 
  const [openRoom, setOpenRoom] = useState(false)
  const [currentRoom, setCurrentRoom] = useState("");
  const [openCurrentRoom, setOpenCurrentRoom] = useState(false);
  const handleRoom = (name: string) => {
    setCurrentRoom(name);
    setOpenCurrentRoom(true);
  };
  return (
    <>
    <Dialog.Root open={openCurrentRoom} onOpenChange={setOpenCurrentRoom}>
		<Dialog.Portal >
			<Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 lg:rounded-md bg-gray-900 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 hidden text-[18px] font-black">
					All Appliances
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal font-bold hidden ">
					Manage your appliciances here:
				</Dialog.Description>
				
				<CurrentRoom currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
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
    <Dialog.Root open={openRoom} onOpenChange={setOpenRoom}>
        <Dialog.Portal >
          <Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 lg:rounded-md bg-gray-900 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-[18px] font-black ">
              All Rooms
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal font-bold">
              Manage all your Rooms here:
            </Dialog.Description>
            
            <AllRooms/>
            <Dialog.Close asChild>
              <button
                className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full  cursor-pointer hover:text-[30px] focus:outline-none"
						aria-label="Close"
              >
                <LuX />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    <section className=" w-full px-2 ">
           <div className='flex items-center justify-between p-2'>
            <h2 className="font-black text-lg ">Rooms:</h2>
            <p onClick={()=> setOpenRoom(true)} className=" text-white hover:text-blue-400 cursor-pointer active:text-blue-600/80">
                view all
              </p>
           </div>
          <div className="flex lg:grid grid-cols-2  lg:grid-cols-3 overflow-hidden scrollbar-hide overflow-x-scroll gap-2 mt-2 p-2">
        {
          rooms.map((items, index) => {
            return (
              <div onClick={()=> handleRoom(items.room)} key={index} className={`w-[200px] rounded-2xl bg-blue-950 text-white flex flex-col shrink-0  items-center justify-center p-2 border-blue-700  border gap-4 ${index > 4 ? "hidden":""}  cursor-pointer active:bg-gray-900/80`}>
                <div className=" flex-1 h-full flex items-center justify-center">
                  <LuDoorOpen size={40}/>
                </div>
                <div className="w-[60%]  flex items-center flex-col">
                  <p className="text-lg font-bold">{items.room}</p>
                <p className="text-sm text-[#a3a3a3]">Appliances: {items.counts}</p>
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

export default RoomOverview