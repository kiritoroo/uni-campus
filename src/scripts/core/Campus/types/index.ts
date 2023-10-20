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

export type ICampusStoreProxyContext = ICampusStoreProxy;
