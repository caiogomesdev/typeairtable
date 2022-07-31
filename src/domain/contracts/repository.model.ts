import { QueryFind, QueryFindAll } from './query-find.model';

type data<T extends string[]> = Record<T[number] | 'id' | 'createdTime', any>;

export interface RepositoryModel<T extends string = any> {
  find<E extends QueryFind<T>>(
    params: E
  ): Promise<data<E['select'] & string> | null>;

  findAll<E extends QueryFindAll<T>>(
    params: E
  ): Promise<data<E['select'] & string>[]>;
}
