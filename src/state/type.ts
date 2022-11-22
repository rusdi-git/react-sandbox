import { CredentialState } from './credential/type';
import { ThemeState } from './theme/type';

export type StateKey = 'credential';
export type StateType = CredentialState | ThemeState;

export interface State {
  theme: ThemeState;
  credential: CredentialState;
}

export interface Dispatch {
  (action: GenericActionType): void;
}

export interface Initial {
  state: State;
  dispatch: Dispatch;
}

export interface GenericActionType {
  type: string;
}

export interface GenericReducerParams<T> {
  state: T;
  action: GenericActionType;
}

export interface GenericReducer<T> {
  (state: T, action: GenericActionType): T;
}
