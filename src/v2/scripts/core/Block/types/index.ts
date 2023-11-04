import { StoreApi } from "zustand";

export interface IBlockStore {
  blockUUID: string;
}

export interface IBlockStoreProxy {
  isPointerEnter: boolean;
  isPicked: boolean;
}

export type IBlockStoreContext = StoreApi<IBlockStore>;

export type IBlockStoreProxyContext = IBlockStoreProxy;
