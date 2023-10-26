import React from "react";

export const UIBuildingInfo = () => {
  return (
    <div className="absolute bottom-[50px] left-[50px] top-[60px] z-[9999999999] h-auto w-[420px] overflow-hidden rounded-[10px] bg-[#F4F6F9] shadow-[0_1px_10px_0_rgba(220,220,220,0.3)]">
      {/* <h1 className="pb-3 text-center text-2xl font-bold">Engine Workshop</h1> */}
      <div className="relative overflow-hidden">
        <img
          src="/images/test.jpg"
          className="relative z-[1] h-[40vh] w-full select-none object-cover grayscale-[50%]"
        />
        <div className="absolute bottom-0 left-0 z-[2] h-[40%] w-full bg-gradient-to-t from-black/60 to-transparent ring-0" />
        <div className="absolute bottom-5 left-0 right-0 z-[3] w-full px-8 text-left text-white">
          <h2 className="text-2xl font-bold">Parking zone</h2>
          <p className="text-md font-normal">Faculty/Staff Parking</p>
        </div>
      </div>
    </div>
  );
};
