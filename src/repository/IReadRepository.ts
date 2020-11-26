export interface IReadRepository<T> {
  get: (id: number) => Promise<T | undefined>;
  getBy: (where: Partial<T>) => Promise<T[]>;
}
