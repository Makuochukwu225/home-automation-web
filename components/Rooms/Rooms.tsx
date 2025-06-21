import Image from "next/image";
import { LuDelete, LuToggleLeft, LuTrash } from "react-icons/lu";

interface roomProp  {
name: string;
count: number;
}

function Rooms({name, count}:roomProp) {
  return (
    <div className="w-full bg-blue-950 rounded-lg p-4">
      <div className=" min-h-[300px] flex flex-col gap-2">
       <div className="flex justify-between items-center">
         <h1 className="font-black">{name}</h1>
      <p className="font-black">{count}</p>
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
  )
}

export default Rooms