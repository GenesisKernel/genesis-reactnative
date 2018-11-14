declare interface IGetAccountEcoInfo {
  key_id: string;
  ecosystems: Array<{
    ecosystem: string,
    name: string,
    roles: Array<{
      id: string,
      name: string,
    }>,
  }>,
}
declare interface IGetAccInfo {
  public: string;
}

declare interface IAuthPayload {
  publicKey: string;
  privateKey: string;
  key_id: string;
  role_id: string;
  ecosystem_id: string;
}
