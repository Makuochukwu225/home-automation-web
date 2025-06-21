import Appliances from "./Appliances";
function AllAppliances() {
  return (
    <div className="grid grid-cols-1 gap-4 h-[87%] overflow-hidden overflow-y-scroll  py-2 scrollbar-hide">
      <Appliances name={"Lights"} count={5} />
      <Appliances name={"Lights"} count={10} />
      <Appliances name={"Lights"} count={7} />
      <Appliances name={"Lights"} count={3} />
    </div>
  );
}

export default AllAppliances;
