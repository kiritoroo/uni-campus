import {  createStore } from "zustand"
import { IBuildingStore } from "../types"
import { v4 as uuidv4} from "uuid"

export const BuildingStore = () => {
  return createStore<IBuildingStore>((set) => ({
    building_uuid: uuidv4(),
    set_building_uuid: (id) => set(() => ({building_uuid: id}))
  }))
}