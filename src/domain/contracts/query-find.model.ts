export interface DefaultQueryFind<T, K = keyof T & string> {
  where?: Where<T> | Array<Where<T>>;
  select?: Array<K>;
  orderBy?: OrderBy;
}

type Where<T> = {
  [P in keyof T]?: any
}

interface OrderBy {
  field: string;
  order: 'asc' | 'desc';
}

export interface QueryFind<T = any> extends DefaultQueryFind<T> {}

export interface QueryFindAll<T = any> extends DefaultQueryFind<T> {
  take?: number;
}
