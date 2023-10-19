import { DraftBuildingStore } from "@Components/CampusBuilding/draft/DraftBuildingStore"
import { Fragment } from "react"

const App = () => {
  console.warn("Re: Render")

  return (
    <Fragment>
      <DraftBuildingStore />
    </Fragment>
  )
}

export default App