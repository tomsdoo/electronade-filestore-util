export class FileStore {
  protected filePath: string;
  protected exposedName: string;
  constructor(filePath: string, exposedName?: string) {
    this.filePath = filePath;
    this.exposedName = exposedName ?? "electronade";
  }

  public async get(id: string): Promise<any> {
    // @ts-expect-error
    return globalThis[this.exposedName].filestore.get(this.filePath, id);
  }

  public async getIds(): Promise<string[]> {
    // @ts-expect-error
    return globalThis[this.exposedName].filestore.getIds(this.filePath);
  }

  public async save(item: object): Promise<any> {
    // @ts-expect-error
    return globalThis[this.exposedName].filestore.save(this.filePath, item);
  }

  public async remove(id: string): Promise<undefined> {
    // @ts-expect-error
    return globalThis[this.exposedName].filestore.remove(this.filePath, id);
  }
}
