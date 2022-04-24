import { TOKEN_KEY } from '../../config/key';
import { CredentialState } from './type';

const credentialInitialState: CredentialState = { token: localStorage.getItem(TOKEN_KEY) || null };

export default credentialInitialState;
