import { QueryFind, QueryFindAll } from './query-find.model';

export type Data<T extends string> = Record<T | 'id' | 'createdTime', any>;

export type DataResult<T, E> = Data<
  E extends string[] ? E[number] : T & string
>;

export interface RepositoryModel<T extends string = any> {
  find<E extends QueryFind<T>>(params: E): Promise<DataResult<T, E['select']>>;

  findAll<E extends QueryFindAll<T>>(
    params: E
  ): Promise<DataResult<T, E['select']>[]>;
}
