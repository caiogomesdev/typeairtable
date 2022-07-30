import { ConfigModel, Field, QueryFind, QueryFindAll, TableModel } from '../../../src/domain/contracts';

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
    this.getSelect();
    return this.url;
  }

  getSelect() {
    this.dataInstance.select?.forEach(item => {
      this.url = `${this.url}&fields[]=${item}`;
    })
  }
}

const makeSut = (dataInstance: QueryFind & QueryFindAll) => {
  const config: ConfigModel = { baseUrl: 'https://api.airtable.com/v0/any', apiKey: 'any_key' };
  const table: TableModel = {
    tableName: 'MyTable', columns: [
      { name: 'name', type: Field.SINGLE_TEXT },
      { name: 'email', type: Field.SINGLE_TEXT },
      { name: 'password', type: Field.SINGLE_TEXT },
    ]
  }
  const sut = new UrlGenerator(config, table, dataInstance);
  const initialUrl = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;

  return { sut, initialUrl };
}

describe('UrlGenerator', () => {
  it('Should return url correct if dataInstance is empty', () => {
    const { sut, initialUrl } = makeSut({});
    expect(sut.getUrl()).toBe(initialUrl);
  })

  it('Should return url correct if exists select', () => {
    const { sut, initialUrl } = makeSut({ select: ['name', 'email'] });
    const url = `${initialUrl}&fields[]=name&fields[]=email`;
    expect(sut.getUrl()).toBe(url);
  })
})
