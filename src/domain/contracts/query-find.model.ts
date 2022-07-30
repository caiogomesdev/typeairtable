export interface DefaultQueryFind<T = any, K = keyof T & string> {
  where?: Where<T> | Array<Where<T>>;
  select?: Array<K>;
  orderBy?: OrderBy<T>;
}

type Where<T> = {
  [P in keyof T]?: any
}

type OrderBy<T> = {
  [P in keyof T]?: 'asc' | 'desc';
}

export interface QueryFind<T = any> extends DefaultQueryFind<T> {}

export interface QueryFindAll<T = any> extends DefaultQueryFind<T> {
  take?: number;
}
