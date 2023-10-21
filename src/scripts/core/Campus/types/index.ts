import { StoreApi } from "zustand";

export interface ICampusStore {
  campusCamera: THREE.PerspectiveCamera | null;
  setCampusCamera: (camera: THREE.PerspectiveCamera) => void;
}

export interface ICampusStoreProxy {
  campusCamera: THREE.PerspectiveCamera | null;
  buildingsPointerEnter: {
    buildingUUID: string;
    distance: number;
  }[];
  buildingPointerEnterNearest: {
    buildingUUID: string;
  } | null;
  buildingPicked: {
    buidlingUUID: string;
  } | null;
}

export type ICampusStoreContext = StoreApi<ICampusStore>;

export type ICampusStoreProxyContext = ICampusStoreProxy;
