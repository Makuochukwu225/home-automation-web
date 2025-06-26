"use client"
import { Dialog } from "radix-ui";
import { useState } from "react";
import { LuMinus, LuPlus, LuToggleLeft, LuTrash, LuTrash2, LuX } from "react-icons/lu";
import CurrentAppliance from "./CurrentAppliance"

interface applianceProp  {
name: string;
count: number;
}
function Appliances({name, count}:applianceProp) {
  const [openAppliance, setOpenAppliance] = useState(false)
  const [appliance, setAppliance] = useState("")
  const handleAppliance = (name: string) => {
    setAppliance(name);
    setOpenAppliance(true);
  };
  return (<>
    <Dialog.Root open={openAppliance} onOpenChange={setOpenAppliance}>
		<Dialog.Portal >
			<Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 lg:rounded-md bg-gray-900 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 hidden text-[18px] font-black">
					All Appliances
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal font-bold hidden ">
					Manage your appliciances here:
				</Dialog.Description>
				
				<CurrentAppliance appliance={appliance} setAppliance={setAppliance}/>
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
          <div className=" min-h-[200px] flex flex-col gap-2">
           <div className="flex justify-between items-center">
             <h1 className="font-black">{name}</h1>
          <div className="flex items-center gap-4">
            <span onClick={()=> handleAppliance(name)} className="hover:text-sm hover:text-gray-400 text-gray-300 font-bold cursor-pointer text-xs ">Details</span>
            <p className="font-black">{count}</p> 
          </div>
           </div>
           <div>
            {
              Array.from({length: count}).map((_,index)=>(
                <div key={index} className="flex w-full  justify-between items-center p-2 border-b-blue-900 border-b-[1px]">
                  <div>
                    <p>{name}</p>
                    <p className="text-[#a3a3a3] text-xs">Room name</p>
                  </div>
                  <div className="flex gap-2">
                    <LuToggleLeft size={24} color="gray"/>
                    {name.toLowerCase() === "fans"  ? <div className="flex items-center gap-2">
                      <LuMinus size={24} color="gray"/>
                      <LuPlus size={24} color="gray"/>
                      </div> : name.toLowerCase() === "air conditioner" ?  <div className="flex items-center gap-2">
                      <LuMinus size={24} color="gray"/>
                      <LuPlus size={24} color="gray"/>
                      </div>: ""}
                    <LuTrash2 size={24} className="hover:text-red-600 text-gray-500"/>
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

export default Appliances