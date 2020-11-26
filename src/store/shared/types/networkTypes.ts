import { Action } from 'redux';
import { NetInfoStateType } from '@react-native-community/netinfo';

export const CHANGE_NETWORK_STATUS = 'CHANGE_NETWORK_STATUS';

export interface INetworkStatus {
  type: NetInfoStateType;
  isConnected: boolean;
}

export type INetworkStatusState = INetworkStatus;

export interface IChangeNetworkStatusAction extends Action<typeof CHANGE_NETWORK_STATUS> {
  payload: INetworkStatus;
}

export type NetworkActions = IChangeNetworkStatusAction;
