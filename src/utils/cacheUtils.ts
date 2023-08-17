export interface CacheType extends Record<string, unknown> {
  readonly has: (key: string) => boolean;
  readonly set: <T>(key: string, value: T) => void;
  readonly get: <T>(key: string) => T | undefined;
}

const Cache: CacheType = {
  universResp: undefined,
  has(key: string) {
    return key in this;
  },
  set<T>(key: string, value: T) {
    this[key] = value;
  },
  get<T>(key: string) {
    return <T>this[key] || undefined;
  },
};
export default Cache;
