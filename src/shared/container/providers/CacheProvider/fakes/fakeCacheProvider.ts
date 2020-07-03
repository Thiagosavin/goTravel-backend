import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface CacheData {
  [key: string]: string;
}
export default class FakeCacheProvider implements ICacheProvider {
  private cache: CacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async delete(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }
}
