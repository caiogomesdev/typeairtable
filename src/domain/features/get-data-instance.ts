import { DataInstanceModel, TableModel } from '../contracts';

export interface GetDataInstace {
  getInstance(table: TableModel): DataInstanceModel;
}
