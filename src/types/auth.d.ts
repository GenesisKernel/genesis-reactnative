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
