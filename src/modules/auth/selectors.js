export const getKeyPair = state => state.auth.keyPair;

export const getToken = state => state.auth.token;

export const getRefreshToken = state => state.auth.refresh;

export const getPublicKey = state => state.auth.publicKey;

export const hasValidToken = state =>
  !!getToken(state) && Date.now() < state.auth.tokenExpiry;

export const getTokenExpiry = state => state.auth.tokenExpiry;

export const getCurrentEcosystemId = state => state.accounts[state.auth.currentAccount].ecosystem_id;
export const getAuthStatus = state => state.auth.isAuthenticated;

export const getCurrentAccount = state => state.auth.currentAccount;