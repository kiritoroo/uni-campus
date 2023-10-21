import { OrbitControls } from "three-stdlib";
import { StoreApi } from "zustand";

export interface ICampusStore {
  campusCamera: THREE.PerspectiveCamera | null;
  campusControls: OrbitControls | null;
  setCampusCamera: (camera: THREE.PerspectiveCamera) => void;
  setCampusControls: (controls: OrbitControls) => void;
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
