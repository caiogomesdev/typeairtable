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
    this.url = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  }

  getUrl(): string {
    this.checkSelect();
    this.checkWhere();
    this.checkOrderBy();
    return this.url;
  }

  checkSelect() {
    this.dataInstance.select?.forEach(item => {
      this.url = `${this.url}&fields[]=${item}`;
    })
  }

  checkOrderBy() {
    if (!this.dataInstance.orderBy) {
      return;
    }
    Object.keys(this.dataInstance.orderBy).forEach((item, index) => {
      const value = (this.dataInstance.orderBy as any)[item];
      this.url = `${this.url}&sort[${index}][field]=${item}&sort[${index}][direction]=${value}`;
    })
  }

  checkWhere() {
    if (!this.dataInstance.where || !Object.keys(this.dataInstance.where).length) {
      return;
    }
    this.url = `${this.url}&filterByFormula=`;
    const where = this.dataInstance.where;
    const isArray = Array.isArray(where);
    if (isArray) {
      return;
    }
    const whereArrat = Object.keys(where).map(item => {
      const value = where[item];
      return `{${item}}='${value}'`;
    })
    this.url = `${this.url}AND(${whereArrat.join(',')})`;
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

  it('Should return url correct if exists orderBy', () => {
    const { sut, initialUrl } = makeSut({ orderBy: { name: 'asc', email: 'desc'} });
    const url = `${initialUrl}&sort[0][field]=name&sort[0][direction]=asc&sort[1][field]=email&sort[1][direction]=desc`;
    expect(sut.getUrl()).toBe(url);
  })

  it('Should return url correct if exists where with AND operator', () => {
    const { sut, initialUrl } = makeSut({ where: { name: 'any_name', email: 'any_email'}});
    const url = `${initialUrl}&filterByFormula=AND({name}='any_name',{email}='any_email')`;
    expect(sut.getUrl()).toBe(url);
  })
})
