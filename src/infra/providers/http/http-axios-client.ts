import { HttpClient } from '@/data/protocols/http/http-client';
import axios from 'axios';

export class HttpAxiosClient implements HttpClient {
  async get<T = any>(url: string): Promise<T> {
    const http = await axios.get(url);
    return http.data;
  }
}
