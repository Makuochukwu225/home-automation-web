import { devList } from "@/constants/structure";
import Appliances from "./Appliances";
function AllAppliances() {
  return (
    <div className="grid grid-cols-1 gap-4 h-[87%] overflow-hidden overflow-y-scroll  py-2 scrollbar-hide">
      {
        devList.map((items, index) => {
          return (
            <Appliances key={index} name={items.device} count={5}  />
          );
        })
      }
     
    </div>
  );
}

export default AllAppliances;
