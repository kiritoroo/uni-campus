import { proxy } from "valtio";
import { ICampusStoreProxy } from "../types";

export const CampusStoreProxy = () => {
  return proxy<ICampusStoreProxy>({
    buildingsPointerEnter: [],
    buildingPointerEnterNearest: null,
    buildingPicked: null,
  });
};
