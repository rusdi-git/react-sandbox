export interface CredentialState {
  token: string | null;
}

export enum CredentialActionType {
  SUCCESS_GET_TOKEN = 'SUCCESS_GET_TOKEN',
  NO_TOKEN = 'FAIL_GET_TOKEN',
}

export interface SuccessGetCredentialAction {
  type: CredentialActionType.SUCCESS_GET_TOKEN;
  payload: Required<CredentialState>;
}

export interface NoCredentialAction {
  type: CredentialActionType.NO_TOKEN;
}

export type CredentialAction = SuccessGetCredentialAction | NoCredentialAction;
