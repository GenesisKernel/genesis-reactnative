import { AxiosRequestConfig } from 'axios';
import { create } from 'apisauce';
import { memoize } from 'ramda';
import { HOST } from '../config';
// Workaround. url-search-params very old.
const URLSearchParams = require('../../node_modules/url-search-params/build/url-search-params.node');

const memoTree = memoize((json) => JSON.parse(json));

const api = create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});

api.addRequestTransform(request => {
  if (request.method === 'post' && request.data) {
    const data = { ...request.data };
    const params = new URLSearchParams();
    const keys = Object.keys(data);

    keys.forEach(key => {
      if (data[key] === undefined) {
        return;
      }

      params.append(key, data[key]);
    });

    request.data = params.toString();
  }
});

api.addResponseTransform(response => {
  if (!response.ok) {
    const message: string =
      (response.data && response.data.msg) || response.problem;
    const error = new Error(message);

    error.message = message;
    error.data = response.data;
    error.status = response.status;

    throw error;
  }
});

export const apiSetToken = (token: string) => {
  api.setHeader('Authorization', `Bearer ${token}`);
};

export const apiDeleteToken = () => {
  api.deleteHeader('Authorization');
};

export interface IError {
  error: string;
}

export interface IResponse extends IError {}

export interface IRefreshResponse extends IResponse {
  token: string;
  refresh: string;
}

export interface IUidResponse extends IResponse {
  uid: string;
  token: string;
}

export interface ILoginResponse extends IResponse {
  token: string;
  refresh: string;
  state: string;
  wallet: string;
  address: string;
  expiry: Date;
}

export interface IRefreshResponse extends IResponse {
  token: string;
  refresh: string;
}

export interface IParameterResponse extends IResponse {
  name: string;
  value: string;
  conditions: string;
}

export interface IContentResponse extends IResponse {
  name: string;
  tree: string;
}

export interface ITxStatusResponse extends IResponse {
  blockid: string;
  result: string;
  errmsg: string;
}

export interface ITxPrepareResponse extends IResponse {
  forsign: string;
  time: number;
}

export default {
  getUid: () => api.get<IUidResponse>('/getuid'),

  login: (payload: {
    publicKey: string;
    signature: string;
    ecosystem: string;
  }) =>
    api.post<ILoginResponse>('/login', {
      pubkey: payload.publicKey.slice(2),
      signature: payload.signature,
      ecosystem: payload.ecosystem || '0'
    }),

  refresh: (payload: {
    token: string;
  }) =>
    api.post<IRefreshResponse>('/refresh', payload),

  getEcosystemParameters: (id: string, params: string[] = []) =>
    api
      .get<IParameterResponse[]>(
        `ecosystemparams?ecosystem=${id}&names=${params.join(',')}`
      )
      .then(response => ({ ...response, data: response.data.list })),

  getContentOfPage: (name: string, params: { [key: string]: any } = {}) =>
    api
      .post<IContentResponse>(`content/page/${name}`, params)
      .then(response => ({
        ...response,
        data: {
          name,
          tree: memoTree(response.data.tree),
          menuTree: memoTree(response.data.menutree)
        }
      })),

  prepareContract: (name: string, params: { [key: string]: any }) =>
    api.post<ITxPrepareResponse>(`prepare/${name}`, params),

  runContract: (name: string, params: { [key: string]: any }) =>
    api.post(`contract/${name}`, params),

  transactionStatus: (hash: string) =>
    api.get<ITxStatusResponse>(`/txstatus/${hash}`)
};
