interface BaseQueryFind<T = any, K = keyof T & string> {
  where?: Where<T> | Array<Where<T>>;
  select?: Array<K>;
  orderBy?: OrderBy<T>;
}

export type Where<T> = {
  [P in keyof T]?: any;
};

type OrderBy<T> = {
  [P in keyof T]?: 'asc' | 'desc';
};

export interface QueryFind<T = any> extends BaseQueryFind<T> {}

export interface QueryFindAll<T = any> extends BaseQueryFind<T> {
  take?: number;
}

export type DefaultQueryFind<T = any> = QueryFind<T> & QueryFindAll<T>;
