import { AxiosRequestConfig } from 'axios';
import { create, ApisauceInstance } from 'apisauce';
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

export const apiSetUrl = (url: any) => {
  api.setBaseURL(url);
}

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

export class apiFactory {
  constructor(api: ApisauceInstance) {
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

    this.getRow = (table: string, id: string | number) => api.get(`row/${table}/${id}`);
    this.getUid = () => api.get<IUidResponse>('/getuid');
    this.login = (payload: {
      publicKey: string;
      signature: string;
      ecosystem: string;
    }) =>
      api.post<ILoginResponse>('/login', {
        pubkey: payload.publicKey.slice(2),
        signature: payload.signature,
        ecosystem: payload.ecosystem || '0'
      });

    this.getCentrifugoUrl = () => api.get('/config/centrifugo');
    this.refresh = (payload: { token: string;}) => api.post<IRefreshResponse>('/refresh', payload);

    this.getEcosystemParameters = (id: string, params: string[] = []) =>
      api.get<IParameterResponse[]>(
          `ecosystemparams?ecosystem=${id}&names=${params.join(',')}`).then(response => ({ ...response, data: response.data.list }));

    this.getContentOfPage = (name: string, params: { [key: string]: any } = {}) =>
      api.post<IContentResponse>(`content/page/${name}`, params).then(response => ({
          ...response,
          data: {
            name,
            tree: response.data.tree,
            menuTree: response.data.menutree,
          }
        }));

    this.prepareContract = (name: string, params: { [key: string]: any }) =>
      api.post<ITxPrepareResponse>(`prepare/${name}`, params);

    this.runContract = (name: string, params: { [key: string]: any }) => api.post(`contract/${name}`, params);

    this.prepareMultiple = (params: { contracts: { contract: string; params: any }[] }) => api.post('prepareMultiple', {
      data: JSON.stringify(params),
    });

    this.runMultiple = (request_id: string, params: { [key: string]: any }) => api.post(`contractMultiple/${request_id}`, {
      data: JSON.stringify(params),
    });

    this.transactionStatus = (hash: string) => api.get<ITxStatusResponse>(`/txstatus/${hash}`);

    this.transactionStatusMultiple = (hashes: string[]) => api.post(`/txstatusMultiple/`, {
      data: JSON.stringify(hashes),
    });

    this.updateNotifications = (payload: object) => api.post('/updnotificator', payload);

    this.getUsername = (session: string, id: string) => api.get(`row/members/${id}?columns='member_name'`, session);

    this.getFullNodes = () => api.get('/systemparams?names=full_nodes');
  };
}

const apiInstance: any = new apiFactory(api);

export default apiInstance;