export interface IWriteRepository<T> {
  create: (item: T) => Promise<T | undefined>;
  update: (item: T, id: number) => Promise<T | undefined>;
  delete: (id: number) => Promise<void>;
}
