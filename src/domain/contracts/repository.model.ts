import { QueryFind } from './query-find.model';

export interface RepositoryModel<T extends string = any> {
  find(params: QueryFind<T>): Promise<T>;
}
