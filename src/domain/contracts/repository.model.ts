import { QueryFind } from './query-find.model';

export interface RepositoryModel {
  find<T = any>(params: QueryFind<T>): Promise<T>;
}
