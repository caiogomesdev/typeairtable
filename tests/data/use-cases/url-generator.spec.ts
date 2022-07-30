import { ConfigModel, QueryFind, QueryFindAll, TableModel } from '../../../src/domain/contracts';

interface GetUrlGenerator {
  getUrl(dataInstance: QueryFind & QueryFindAll): string;
}

class UrlGenerator implements GetUrlGenerator {
  url: string;

  constructor(
    private readonly config: ConfigModel,
    private readonly table: TableModel,
    private readonly dataInstance: QueryFind & QueryFindAll)
  {
    this.url = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`
  }

  getUrl(): string {
    return this.url;
  }
}

const makeSut = (dataInstance: QueryFind & QueryFindAll) => {
  const config: ConfigModel = { baseUrl: 'https://api.airtable.com/v0/any', apiKey: 'any_key' };
  const table: TableModel = { tableName: 'MyTable', columns: [] }
  const sut = new UrlGenerator(config, table, dataInstance);
  const initialUrl = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;

  return { sut, initialUrl };
}

describe('UrlGenerator', () => {
  it('Should return url with baseUrl and apikey if dataInstance is empty', () => {
    const { sut, initialUrl } = makeSut({});
    expect(sut.getUrl()).toBe(initialUrl);
  })
})
