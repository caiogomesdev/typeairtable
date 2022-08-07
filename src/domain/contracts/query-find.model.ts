import { ColumnsModel, Field } from './table.model';

interface BaseQueryFind<T extends ColumnsModel = any> {
  where?: Where<T>;
  select?: Array<keyof T>;
  orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>;
}

export type Where<T extends ColumnsModel = any> =
  | WhereObject<T>
  | WhereObject<T>[];

type WhereObject<T extends ColumnsModel> = {
  [key in keyof T]?: WhereValue<T[key]>;
};

type WhereValue<T extends Field> = T extends 'checkBox'
  ? boolean
  : T extends 'number'
  ? number
  : string;

export interface QueryFind<T extends ColumnsModel = any>
  extends BaseQueryFind<T> {}

export interface QueryFindAll<T extends ColumnsModel = any>
  extends BaseQueryFind<T> {
  take?: number;
}

export interface DefaultQueryFind extends Partial<QueryFind> {
  take?: number;
}

// ---------------------------------------------------- //

type ConvertFieldType<T extends ColumnsModel> = {
  [key in keyof T]: ConvertFieldValue<T[key]>;
};

type ConvertFieldValue<T extends Field> = T extends 'number'
  ? number
  : T extends 'singleText'
  ? string
  : T extends 'file'
  ? any[]
  : T;

interface TesteFunc {
  find<T extends ColumnsModel>(args: T): ConvertFieldType<T>;
  findResult<T extends ColumnsModel, E = keyof T>(args: T): { select: E[] };
}

class TestClass implements TesteFunc {
  findResult<T extends ColumnsModel, E = keyof T>(args: T): { select: E[] } {
    throw new Error('Method not implemented.');
  }
  find<T extends ColumnsModel>(args: T): ConvertFieldType<T> {
    throw new Error('Method not implemented.');
  }
}
const a = new TestClass();

const result = a.find({
  name: 'singleText',
  email: 'number',
  password: 'file',
});

const result2 = a.findResult({
  name: 'singleText',
  email: 'number',
  password: 'file',
});

result2.select = ['email', 'name', 'password'];

result.password;
