import { LuBell} from "react-icons/lu"
import RoomOverview from "./Rooms/RoomOverview";
import ApplianceOverview from "./Appliances/ApplianceOverview";
import Frequent from "./Frequent/Frequent";

export const HomePage = ()=>{
  
  return (
    <div className="flex flex-col w-full h-full ">

      <header className=" flex items-center justify-between  px-3">
        <div className="flex items-center gap-2 py-1 w-fit">
          <div className="h-10 w-10 rounded-full bg-gray-400"/>
          <p>Niizar</p>
        </div>
        <LuBell size={20}/>
      </header>
      <div className="flex gap-3 flex-col flex-1 bg-gray-950">
        <ApplianceOverview/>
        <RoomOverview/>
        <Frequent/>
      </div>
    </div>
  )
}