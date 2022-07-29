export interface DefaultQueryFind<T, K = keyof T> {
  where?: Where<T> | Array<Where<T>>;
  select?: Array<K>;
  orderBy?: OrderBy;
  find: T;
}

type Where<T> = {
  [P in keyof T]?: any
}

interface OrderBy {
  field: string;
  order: 'asc' | 'desc';
}

export interface QueryFind<T> extends DefaultQueryFind<T> {}

export interface QueryFindAll<T> extends DefaultQueryFind<T> {
  take?: number;
}
