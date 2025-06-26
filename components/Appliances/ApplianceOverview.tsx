import React from 'react'
import { useState } from "react"
import { LuAirVent, LuBell, LuDoorOpen, LuEllipsis, LuFan, LuLightbulb, LuSnowflake, LuToggleLeft, LuToggleRight, LuTv, LuX } from "react-icons/lu"
import { Dialog } from "radix-ui";
import AllAppliances from "./AllAppliances";
import { devList } from '@/constants/structure';
import CurrentAppliance from './CurrentAppliance';

function ApplianceOverview() {
  
  const [openA, setOpenA] = useState(false)
  const [openAppliance, setOpenAppliance] = useState(false)
  const [appliance, setAppliance] = useState("")
  const handleAppliance = (name: string) => {
    setAppliance(name);
    setOpenAppliance(true);
  };
  return (
    <>
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
				
				<CurrentAppliance appliance={appliance} setAppliance={setAppliance} />
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
    <Dialog.Root open={openA} onOpenChange={setOpenA}>
		<Dialog.Portal >
			<Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 lg:rounded-md bg-gray-900 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 text-[18px] font-black">
					All Appliances
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal font-bold ">
					Manage your appliciances here:
				</Dialog.Description>
				
				<AllAppliances/>
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
    <section className="w-full mt-5 px-2 ">
          <h2 className="font-black text-lg ">Appliances:</h2>
          <div className="h-20 flex justify-evenly gap-2 overflow-x-scroll overflow-hidden scrollbar-hide mt-2">
        {
          devList.map((items, index) => {
            return (
              <div onClick={()=> handleAppliance(items.device)} key={index} className={`h-full rounded-2xl p-3 w-20 bg-blue-950 border border-blue-700  text-white flex flex-col shrink-0 items-center justify-center cursor-pointer active:bg-gray-900/80 ${index>3 ? "hidden":""}`}>
                {items.icon}
                <p className='text-xs text-center'>{items.device}</p>
              </div>
            )
          })
        }
        {devList.length > 4 && <div onClick={()=> setOpenA(true)} className={`h-full rounded-2xl w-20 bg-gray-900 text-white flex flex-col shrink-0 items-center justify-center cursor-pointer active:bg-gray-900/80 border border-gray-700`}>
        
          <LuEllipsis/>
          <p className='text-sm text-[#a3a3a3]'>View all</p>
          </div>}
        </div>
        </section>
    </>
  )
}

export default ApplianceOverview