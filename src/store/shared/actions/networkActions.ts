import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  INetworkStatus,
  INetworkStatusState,
  IChangeNetworkStatusAction,
  CHANGE_NETWORK_STATUS,
} from '../types/networkTypes';

// eslint-disable-next-line import/prefer-default-export
export const changeNetworkStatus: ActionCreator<
  ThunkAction<
    Promise<IChangeNetworkStatusAction>,
    INetworkStatusState,
    unknown,
    IChangeNetworkStatusAction
  >
> = ({ type, isConnected }: INetworkStatus) => {
  return async (
    dispatch: ThunkDispatch<INetworkStatusState, unknown, IChangeNetworkStatusAction>,
  ) => {
    const action: IChangeNetworkStatusAction = {
      type: CHANGE_NETWORK_STATUS,
      payload: {
        type,
        isConnected,
      },
    };
    return dispatch(action);
  };
};
