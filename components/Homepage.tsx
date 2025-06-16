"use client"
import { useState } from "react"
import { LuAirVent, LuBell, LuDoorOpen, LuFan, LuLightbulb, LuSnowflake, LuToggleLeft, LuToggleRight, LuTv, LuX } from "react-icons/lu"

      import { Dialog } from "radix-ui";
import AllAppliances from "./Appliances/Appliances";
import AllRooms from "./Rooms/AllRooms";


const devList = [
  {
    device: "lights",
    icon: <LuLightbulb  size={32}/>
  },
  {
    device: "Fans",
    icon: <LuFan size={32}/>
  },
  {
    device: "A/Cs",
    icon: <LuAirVent size={32}/>
  },
  {
    device: "Fridge",
    icon: <LuSnowflake size={32}/>
  },
  {
    device: "Televison",
    icon: <LuTv size={32}/>
  },
  
  
]

const rooms = [
  {
    room: "Room1",
    counts: 5
  },
  {
    room: "Room2",
    counts: 20
  },
  {
    room: "Room3",
    counts: 20
  },
  {
    room: "Room4",
    counts: 20
  },
  {
    room: "Room5",
    counts: 20
  },
  {
    room: "Room6",
    counts: 20
  },
  {
    room: "Room7",
    counts: 20
  },
  {
    room: "Room8",
    counts: 20
  },
  {
    room: "Room9",
    counts: 20
  },
  {
    room: "Room10",
    counts: 20
  },
]

export const HomePage = ()=>{
  const [isOn, setIson] = useState(false)
  const [openA, setOpenA] = useState(false)
  const [openRoom, setOpenRoom] = useState(false)
  const handleToggle = ()=>{
    setIson(!isOn)
  }
  return (
    <div className="flex flex-col w-full h-full ">

<Dialog.Root open={openA} onOpenChange={setOpenA}>
		<Dialog.Portal >
			<Dialog.Overlay className="fixed bg-black inset-0 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-500 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 text-[17px] font-medium ">
					All Appliances
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal ">
					Manage your appliciances here.
				</Dialog.Description>
				
				<AllAppliances/>
				<Dialog.Close asChild>
					<button
						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
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
			<Dialog.Content className="fixed top-1/2 left-1/2 h-full lg:h-[85vh] max-h-[100dvh] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-500 p-4 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 text-[17px] font-medium ">
					All Rooms
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal ">
					Manage all your Rooms here.
				</Dialog.Description>
				
				<AllRooms/>
				<Dialog.Close asChild>
					<button
						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
						aria-label="Close"
					>
						<LuX />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>

      <header className=" flex items-center justify-between  px-3">
        <div className="flex items-center gap-2 py-1 w-fit">
          <div className="h-10 w-10 rounded-full bg-gray-400"/>
          <p>Niizar</p>
        </div>
        <LuBell size={20}/>
      </header>
      <div className="flex gap-3 flex-col flex-1 bg-gray-100">
        <section className="w-full mt-5 px-2 ">
          <h2 className="font-black text-lg text-black">Appliances:</h2>
          <div className="h-20 flex justify-evenly gap-2 overflow-x-scroll overflow-hidden scrollbar-hide">
        {
          devList.map((items, index) => {
            return (
              <div onClick={()=> setOpenA(true)} key={index} className="h-full rounded-2xl w-20 bg-gray-900 text-white flex flex-col shrink-0 items-center justify-center cursor-pointer active:bg-gray-900/80">
                {items.icon}
                <p>{items.device}</p>
              </div>
            )
          })
        }
        </div>
        </section>
        <section className="flex-1 px-2">
           <h2 className="font-black text-lg text-black">Rooms:</h2>
          <div className="border grid grid-cols-2 lg:grid-cols-3  gap-2 ">
        {
          rooms.map((items, index) => {
            return (
              <div onClick={()=> setOpenRoom(true)} key={index} className={`h-20 rounded-2xl bg-gray-900 text-white flex   items-center justify-center p-1 gap-4 ${index > 4 ? "hidden":""}  cursor-pointer active:bg-gray-900/80`}>
                <div className=" flex-1 h-full flex items-center justify-center">
                  <LuDoorOpen size={40}/>
                </div>
                <div className="w-[60%]">
                  <p className="text-lg font-bold">{items.room}</p>
                <p className="text-sm text-[#a3a3a3]">Appliances: {items.counts}</p>
                </div>
              </div>
            )
          })
        }
        {
          rooms.length > 5 ? (
            <div  className="h-20 rounded-2xl bg-gray-900 text-white flex flex-col  items-center justify-center opacity-60  cursor-pointer active:bg-gray-900/80">
                <p>view all</p>
              </div>
          ) : ""
        }
        </div>
        <h2 className="font-black text-lg text-black mt-5">Frequently used:</h2>
          <div className=" border justify-evenly space-y-2  mb-5 md:grid grid-cols-2 md:gap-2">
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
      </div>
    </div>
  )
}