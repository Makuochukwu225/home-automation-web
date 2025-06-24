import Image from "next/image";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { LuDelete, LuToggleLeft, LuTrash, LuX } from "react-icons/lu";
import CurrentRoom from "./CurrentRoom";

interface roomProp  {
name: string;
count: number;
}

function Rooms({name, count}:roomProp) {
  const [openCurrentRoom, setOpenCurrentRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
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
    <div className="w-full bg-blue-950 rounded-lg p-4">
      <div className=" min-h-[300px] flex flex-col gap-2">
       <div className="flex justify-between items-center">
        <h1 className="font-black">{name}</h1>
          <div className="flex items-center gap-4">
            <span onClick={()=> handleRoom(name.toLowerCase())} className="hover:text-sm hover:text-gray-400 text-gray-300 font-bold cursor-pointer text-xs ">Details</span>
            <p className="font-black">{count}</p>
       </div>
         </div>
       <div>
        {
          Array.from({length: count}).map((_,index)=>(
            <div key={index} className="flex w-full  justify-between items-center p-2 border-b-blue-900 border-b-[1px]">
              <p>{name}</p>
              <div className="flex gap-2">
                <LuToggleLeft size={24} color="gray"/>
                <LuTrash size={24} color="red"/>
              </div>
            </div>
          ))
        }
       </div>
      
      </div>
    </div>
    </>
  )
}

export default Rooms