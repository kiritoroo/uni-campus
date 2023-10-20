import * as THREE from "three";

export interface ICampusStoreProxy {
  buildingsPointerEnter: {
    buildingUUID: string;
    distance: number;
  }[];
  buildingPointerEnterNearest: {
    buildingUUID: string;
  } | null;
}

export type ICampusStoreProxyContext = ICampusStoreProxy;
