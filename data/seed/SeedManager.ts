export interface SeedResult<T> {
  data: T;

  cleanup: () => Promise<void>;
}
