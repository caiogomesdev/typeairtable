interface BaseQueryFind<T extends string = any> {
  where?: Where<T>;
  select?: Array<T>;
  orderBy?: Partial<Record<T, 'asc' | 'desc'>>;
}

export type Where<T extends string> =
  | Partial<Record<T, any>>
  | Partial<Record<T, any>>[];

export interface QueryFind<T extends string = any> extends BaseQueryFind<T> {}

export interface QueryFindAll<T extends string = any> extends BaseQueryFind<T> {
  take?: number;
}

export interface DefaultQueryFind extends Partial<QueryFind> {
  take?: number;
}
