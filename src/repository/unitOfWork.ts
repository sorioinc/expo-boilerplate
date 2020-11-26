import { getConnection, Connection, QueryRunner } from 'typeorm/browser';

export async function unitOfWork(work: (connection: Connection) => Promise<void>): Promise<void>;
export async function unitOfWork(
  work: (connection: Connection) => Promise<void>,
  connection: Connection,
): Promise<void>;
export async function unitOfWork(
  work: (connection: Connection) => Promise<void>,
  conn?: Connection,
): Promise<void> {
  const connection = conn || getConnection();
  const queryRunner: QueryRunner = connection.createQueryRunner();
  try {
    await work(connection);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
