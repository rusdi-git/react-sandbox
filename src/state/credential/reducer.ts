import { GenericReducer } from '../type';
import credentialInitialState from './initial';
import {
  CredentialAction,
  CredentialActionType,
  CredentialState,
  SuccessGetCredentialAction,
} from './type';

interface CredentialReducer extends GenericReducer<CredentialState> {
  (state: CredentialState, action: CredentialAction): CredentialState;
}

const credentialReducer: CredentialReducer = (state, action) => {
  switch (action.type) {
    case CredentialActionType.SUCCESS_GET_TOKEN:
      return { ...state, token: (action as SuccessGetCredentialAction).payload.token };
    case CredentialActionType.NO_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
};

const getCredentialReducer: () => [CredentialReducer, CredentialState] = () => {
  return [credentialReducer, credentialInitialState];
};

export default getCredentialReducer;
