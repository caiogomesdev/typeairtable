export interface HttpClient {
  get<T = any>(url: string): Promise<T>;
}
