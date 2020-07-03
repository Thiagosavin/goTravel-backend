export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
}
