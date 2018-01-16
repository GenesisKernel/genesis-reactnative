interface ISource {
  data: string[][];
  types: string[];
  columns: string[];
}

class DataSource {
  private sources: {
    [name: string]: ISource;
  };

  constructor() {
    this.sources = {};
  }

  public set(name: string, source: ISource): void {
    this.sources[name] = source;
  }

  public get(name: string): ISource | undefined {
    return this.sources[name];
  }
}

export default DataSource;
