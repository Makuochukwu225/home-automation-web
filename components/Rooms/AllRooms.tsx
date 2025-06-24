import { rooms } from "@/constants/structure";
import Rooms from "./Rooms"

function AllRooms() {
  return (
    <div className="grid grid-cols-1 gap-4 h-[87%] overflow-hidden overflow-y-scroll  py-2 scrollbar-hide">
      {
        rooms.map((room, index) => {
          return (
            <Rooms key={index} name={room.room} count={room.counts} />
          );
        })
      }

    </div>
  )
}

export default AllRooms