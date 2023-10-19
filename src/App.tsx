import { Fragment } from "react";
import { DraftBuildingStore } from "./core/Building/draft/DraftBuildingStore";

const App = () => {
  console.warn("Re: Render");

  return (
    <Fragment>
      <DraftBuildingStore />
    </Fragment>
  );
};

export default App;
