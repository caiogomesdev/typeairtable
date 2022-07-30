import {
  DataInstanceModel,
  RepositoryModel,
  TableModel,
} from '@/domain/contracts';

export class DataInstance implements DataInstanceModel {
  constructor(private readonly repositoryModel: RepositoryModel) {}

  getRepository<T extends TableModel>(table: T) {
    type Column = keyof T['columns'][number];
    return this.repositoryModel as RepositoryModel<Column>;
  }
}
