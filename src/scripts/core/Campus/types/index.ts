import { OrbitControls } from "three-stdlib";
import { StoreApi } from "zustand";

export interface ICampusStore {
  campusCamera: THREE.PerspectiveCamera | null;
  campusControls: OrbitControls | null;
  setCampusCamera: (camera: THREE.PerspectiveCamera) => void;
  setCampusControls: (controls: OrbitControls) => void;
}

export interface ICampusStoreProxy {
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

export interface ISpaceFilterStoreProxy {
  spacePicked: {
    id: string;
  } | null;
}

export type ICampusStoreContext = StoreApi<ICampusStore>;

export type ICampusStoreProxyContext = ICampusStoreProxy;

export type ISpaceFilterStoreProxyContext = ISpaceFilterStoreProxy;
