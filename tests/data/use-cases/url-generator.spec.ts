import { ConfigModel, DefaultQueryFind, Field, TableModel } from '../../../src/domain/contracts';

interface GetUrlGenerator {
  getUrl(dataInstance: DefaultQueryFind): string;
}

interface UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string;
}

class SelectUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    dataInstance.select?.forEach(item => {
      url = `${url}&fields[]=${item}`;
    })
    return url;
  }
}

class OrderByUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    if (!dataInstance.orderBy) {
      return url;
    }
    Object.keys(dataInstance.orderBy).forEach((item, index) => {
      const value = (dataInstance.orderBy as any)[item];
      url = `${url}&sort[${index}][field]=${item}&sort[${index}][direction]=${value}`;
    })
    return url;
  }
}

class WhereUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    if (!dataInstance.where || !Object.keys(dataInstance.where).length) {
      return url;
    }
    url = `${url}&filterByFormula=`;
    const where = dataInstance.where;
    const isArray = Array.isArray(where);
    if (isArray) {
      return url;
    }
    const whereArrat = Object.keys(where).map(item => {
      const value = where[item];
      return `{${item}}='${value}'`;
    })
    url = `${url}AND(${whereArrat.join(',')})`;
    return url;
  }
}

const makeUrlValidators = () => {
  const selectValidator = new SelectUrlValidator();
  const whereValidator = new WhereUrlValidator();
  const oderByValidator = new OrderByUrlValidator();
  return [selectValidator, whereValidator, oderByValidator];
}

class UrlGenerator implements GetUrlGenerator {
  url: string;

  constructor(
    private readonly config: ConfigModel,
    private readonly table: TableModel,
    private readonly dataInstance: DefaultQueryFind,
    private readonly validators: UrlValidator[] = makeUrlValidators()
  )
  {
    this.url = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  }

  getUrl(): string {
    this.validators.forEach(validator => {
      this.url = validator.validate(this.url, this.dataInstance);
    })
    return this.url;
  }
}

const makeSut = (dataInstance: DefaultQueryFind) => {
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
