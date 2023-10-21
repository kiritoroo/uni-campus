import { proxy } from "valtio";
import { ICampusStoreProxy } from "../types";

export const CampusStoreProxy = () => {
  return proxy<ICampusStoreProxy>({
    campusCamera: null,
    buildingsPointerEnter: [],
    buildingPointerEnterNearest: null,
    buildingPicked: null,
  });
};
