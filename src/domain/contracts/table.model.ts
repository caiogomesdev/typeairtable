export interface TableModel {
  tableName: string;
  columns: ColumnsModel[]
}

export interface ColumnsModel {
  name: string;
  type: Field;
}

export enum Field {
  IMAGE = 'Image',
  SINGLE_TEXT = 'SingleText',
  LONG_TEXT = 'LongText',
  NUMBER = 'Number',
  DATE = 'Date',
}
