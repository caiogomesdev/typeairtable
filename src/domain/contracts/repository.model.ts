import { QueryFind, QueryFindAll } from './query-find.model';
import { ColumnsModel, ConvertFieldType } from './table.model';

type Data<T extends ColumnsModel, F extends any[] | unknown> = {
  [key in F extends any[] ? F[number] : keyof T]: ConvertFieldType<T[key]>;
} & DefaultData;

type DefaultData = {
  id: string;
  createdTime: string;
};

export type DataResult<
  T extends ColumnsModel,
  F extends any[] | unknown
> = Data<T, F>;

export interface RepositoryModel<T extends ColumnsModel = any> {
  find<E extends QueryFind<T>>(params: E): Promise<DataResult<T, E['select']>>;

  findAll<E extends QueryFindAll<T>>(
    params: E
  ): Promise<DataResult<T, E['select']>[]>;
}
