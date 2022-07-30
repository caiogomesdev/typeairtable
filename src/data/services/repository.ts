import { QueryFind, RepositoryModel } from '@/domain/contracts';
import { GetUrlGenerator } from '../../domain/features/get-url-generator';
import { HttpClient } from '../protocols/http/http-client';

export class Repository implements RepositoryModel {
  constructor(
    private readonly urlGenerator: GetUrlGenerator,
    private readonly httpClient: HttpClient
  ) {}
  find<T>(params: QueryFind): Promise<T> {
    const url = this.urlGenerator.getUrl(params);
    return this.httpClient.get(url);
  }
}
