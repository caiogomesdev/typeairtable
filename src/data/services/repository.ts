import {
  DataResult,
  QueryFind,
  QueryFindAll,
  RepositoryModel,
} from '@/domain/contracts';
import { GetUrlGenerator } from '../../domain/features/get-url-generator';
import { HttpClient } from '../protocols/http/http-client';

export class Repository implements RepositoryModel {
  constructor(
    private readonly urlGenerator: GetUrlGenerator,
    private readonly httpClient: HttpClient
  ) {}

  async find<E extends QueryFind<any>>(
    params: E
  ): Promise<DataResult<any, E['select']>> {
    const url = this.urlGenerator.getUrl({ ...params, take: 1 });
    const rawData = await this.httpClient.get(url);
    const data = this.convertRawData(rawData);
    return data && data.length ? data[0] : null;
  }

  async findAll<E extends QueryFindAll<any>>(
    params: E
  ): Promise<DataResult<any, E['select']>[]> {
    const url = this.urlGenerator.getUrl(params);
    const rawData = await this.httpClient.get(url);
    return this.convertRawData(rawData);
  }

  private convertRawData(rawData) {
    return rawData?.records?.map((item) => ({
      ...this.filterIdAndCreatedTime(item),
      ...this.filterFields(item.fields),
    }));
  }

  private filterIdAndCreatedTime(record) {
    return {
      id: record.id,
      createdTime: record.createdTime,
    };
  }

  private filterFields(fields) {
    let result = {};
    Object.keys(fields).forEach((key) => {
      const value = {};
      value[key] = fields[key];
      result = { ...result, ...value };
    });
    return result;
  }
}
