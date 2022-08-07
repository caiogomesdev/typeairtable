import { HttpClient } from '@/data/protocols/http/http-client';
import axios from 'axios';

export class HttpAxiosClient implements HttpClient {
  async get<T = any>(url: string): Promise<T> {
    const http = await axios.get(url);
    return http.data;
  }
  async post<T = any, B = any>(url: string, body: B): Promise<T> {
    const result = await axios.post(url, body);
    return result.data;
  }
}
