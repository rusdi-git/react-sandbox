import { TOKEN_KEY } from '../../config/key';
import { CredentialAction, CredentialActionType } from './type';

export const successGetCredential = (token: string): CredentialAction => {
  localStorage.setItem(TOKEN_KEY, token);
  return { type: CredentialActionType.SUCCESS_GET_TOKEN, payload: { token } };
};

export const clearGetCredential = (): CredentialAction => {
  localStorage.setItem(TOKEN_KEY, '');
  return { type: CredentialActionType.NO_TOKEN };
};
