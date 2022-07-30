export interface TableModel {
  tableName: string;
  columns: ColumnsModel[];
}

export type ColumnsModel = {
  [P in keyof object]: {
    type: Field;
  };
};

export enum Field {
  IMAGE = 'Image',
  SINGLE_TEXT = 'SingleText',
  LONG_TEXT = 'LongText',
  NUMBER = 'Number',
  DATE = 'Date',
}
