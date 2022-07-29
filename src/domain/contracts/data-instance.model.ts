import { RepositoryModel, TableModel } from ".";

export interface DataInstanceModel {
  getRepository(table: TableModel): RepositoryModel;
}
