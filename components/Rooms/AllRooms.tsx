import Rooms from "./Rooms"

function AllRooms() {
  return (
    <div className="grid grid-cols-1 gap-4 h-[87%] overflow-hidden overflow-y-scroll  py-2 scrollbar-hide">
      <Rooms name={"Room1"} count={5} />
      <Rooms name={"Room2"} count={20} />
      <Rooms name={"Room1"} count={5}  />
      <Rooms name={"Room2"} count={20} />
      <Rooms name={"Room1"} count={5}/>
      <Rooms name={"Room2"} count={20}  />
      <Rooms name={"Room1"} count={5}  />
      <Rooms name={"Room2"} count={20}  />

    </div>
  )
}

export default AllRooms