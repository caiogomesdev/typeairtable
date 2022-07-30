import { QueryFind } from './query-find.model';

export interface RepositoryModel<T = any> {
  find(params: QueryFind<T>): Promise<T>;
}
