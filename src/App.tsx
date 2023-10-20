import { CampusScene } from "@Scripts/webgl/scene/CampusScene";
import { Fragment } from "react";

const App = () => {
  console.warn("Re: Render");

  return (
    <Fragment>
      <main className="font-dinpro bg-[#F9F4FA] font-normal antialiased">
        <div className="relative h-screen w-screen">
          <CampusScene />
        </div>
      </main>
    </Fragment>
  );
};

export default App;
