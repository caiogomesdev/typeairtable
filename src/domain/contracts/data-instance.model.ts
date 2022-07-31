import { RepositoryModel, TableModel } from '.';

export interface DataInstanceModel {
  getRepository<T extends TableModel>(
    table: T
  ): RepositoryModel<keyof T['columns'][number]>;
}
