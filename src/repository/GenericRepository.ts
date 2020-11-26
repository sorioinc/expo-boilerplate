import {
  getConnection,
  Connection,
  Repository,
  FindManyOptions,
  InsertResult,
} from 'typeorm/browser';
import { IReadRepository } from './IReadRepository';
import { IWriteRepository } from './IWriteRepository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Newable<T> = new (...rest: any[]) => T;

class GenericRepository<T> implements IReadRepository<T>, IWriteRepository<T> {
  private repository: Repository<T>;

  constructor(entity: Newable<T>);
  constructor(entity: Newable<T>, connection: Connection);
  constructor(entity: Newable<T>, connection?: Connection) {
    this.repository = (connection ?? getConnection()).getRepository(entity);
  }

  async get(id: number): Promise<T | undefined> {
    return this.repository.findOne(id);
  }

  async getBy(where: Partial<T>): Promise<T[]> {
    const options: FindManyOptions = {
      where: {
        ...where,
      },
    };
    return this.repository.find(options);
  }

  create(item: T): Promise<T | undefined> {
    return this.repository.insert(item).then((result: InsertResult) => {
      return this.repository.findOne(result.raw);
    });
  }

  async update(item: T, id: number): Promise<T | undefined> {
    return this.repository.update(id, item).then(() => this.repository.findOne(id));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export default GenericRepository;
