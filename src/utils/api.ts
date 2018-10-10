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
};

export const apiSetToken = (token: string) => {
  api.setHeader('Authorization', `Bearer ${token}`);
};

export const apiDeleteToken = () => {
  api.deleteHeader('Authorization');
};

export interface IError {
  error: string;
}

export interface IResponse extends IError { }

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

export class ApiFactory {
  public api: ApisauceInstance;

  public constructor(api: ApisauceInstance) {
    this.api = api;
    api.addRequestTransform(request => {
      if (request.method === 'post' && request.data) {
        // const isMuptipart = request.headers['Content-Type'].includes('multipart/form-data');
        const data = { ...request.data };
        const params = new FormData();
        const keys = Object.keys(data);

        keys.forEach(key => {
          if (data[key] === undefined) {
            return;
          }

          params.append(key, data[key]);
        });
        // if (!isMuptipart) {
        //   request.data = params.toString();
        // } else {
        request.data = params;
        // }
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
  }

  public getRow = (table: string, id: string | number) => this.api.get(`row/${table}/${id}`);

  public getUid = () => this.api.get<IUidResponse>('/getuid');

  public login = (payload: {
    publicKey: string;
    signature: string;
    ecosystem: string;
    role_id?: string;
  }) =>
    this.api.post<ILoginResponse>('/login', {
      pubkey: payload.publicKey.slice(2),
      signature: payload.signature,
      ecosystem: payload.ecosystem || '0',
      role_id: payload.role_id,
      mobile: 1,
      expire: 30 * 24 * 60 * 60 * 1000,
    })

  public getCentrifugoUrl = () => this.api.get('/config/centrifugo');

  public refresh = (payload: { token: string; }) =>
    this.api.post<IRefreshResponse>('/refresh', payload)

  public getEcosystemParameters = (id: string, params: string[] = []) =>
    this.api.get<IParameterResponse[]>(
      `ecosystemparams?ecosystem=${id}&names=${params.join(',')}`).then(response =>
        ({ ...response, data: response.data.list }))

  public getContentOfPage = (name: string, params: { [key: string]: any } = {}) =>
    this.api.post<IContentResponse>(`content/page/${name}`, { ...params, isMobile: 1 }).then(response => ({
      ...response,
      data: {
        name,
        tree: response.data.tree,
        menuTree: response.data.menutree,
      }
    }))

  public prepareContract = (name: string, params: { [key: string]: any }) => {
    this.api.setHeader('Content-Type', 'multipart/form-data');
    const call = this.api.post<ITxPrepareResponse>(`prepare/${name}`, params);
    this.api.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return call;
  }

  public runContract = (name: string, params: { [key: string]: any }) =>
    this.api.post(`contract/${name}`, params)

  public prepareMultiple = (params: { contracts: Array<{ contract: string; params: any }> }) =>
    this.api.post('prepareMultiple', { data: JSON.stringify(params) })

  public runMultiple = (requestId: string, params: { [key: string]: any }) =>
    this.api.post(`contractMultiple/${requestId}`, {
      data: JSON.stringify(params),
    })

  public transactionStatus = (hash: string) => this.api.get<ITxStatusResponse>(`/txstatus/${hash}`);

  public transactionStatusMultiple = (hashes: string[]) => this.api.post(`/txstatusMultiple/`, {
    data: JSON.stringify(hashes),
  })

  public setTransaction = () => this.api.post('/api/v2/sendTx');

  public getContracts = () => this.api.get('/api/v2/contract');

  public updateNotifications = (payload: object) => this.api.post('/updnotificator', payload);

  public getUsername = (session: string, id: string) =>
    this.api.get(`row/members/${id}?columns='member_name'`, session)

  public getFullNodes = () => this.api.get('/systemparams?names=full_nodes');

  public getEcosystemName = (id: string | number) => this.api.get(`/ecosystemname?id=${id}`);
}

const apiInstance: any = new ApiFactory(api);

export default apiInstance;
