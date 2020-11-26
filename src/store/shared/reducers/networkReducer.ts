import { Reducer } from 'redux';
import { NetInfoStateType } from '@react-native-community/netinfo';

import { INetworkStatusState, NetworkActions, CHANGE_NETWORK_STATUS } from '../types/networkTypes';

const INITIAL_STATE: INetworkStatusState = {
  type: NetInfoStateType.unknown,
  isConnected: false,
};

const networkReducer: Reducer<INetworkStatusState, NetworkActions> = (
  state = INITIAL_STATE,
  action: NetworkActions,
): INetworkStatusState => {
  switch (action.type) {
    case CHANGE_NETWORK_STATUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default networkReducer;
