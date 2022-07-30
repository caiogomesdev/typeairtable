import { UrlGenerator } from '../../../src/data/services/url-generator';
import {
  ConfigModel,
  DefaultQueryFind,
  Field,
  TableModel,
} from '../../../src/domain/contracts';

const makeSut = (dataInstance: DefaultQueryFind) => {
  const config: ConfigModel = {
    baseUrl: 'https://api.airtable.com/v0/any',
    apiKey: 'any_key',
  };
  const table: TableModel = {
    tableName: 'MyTable',
    columns: [
      { name: 'name', type: Field.SINGLE_TEXT },
      { name: 'email', type: Field.SINGLE_TEXT },
      { name: 'password', type: Field.SINGLE_TEXT },
    ],
  };
  const sut = new UrlGenerator(config, table, dataInstance);
  const initialUrl = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  return { sut, initialUrl };
};

describe('UrlGenerator', () => {
  it('Should return url correct if dataInstance is empty', () => {
    const { sut, initialUrl } = makeSut({});
    expect(sut.getUrl()).toBe(initialUrl);
  });

  it('Should return url correct if exists select', () => {
    const { sut, initialUrl } = makeSut({ select: ['name', 'email'] });
    const url = `${initialUrl}&fields[]=name&fields[]=email`;
    expect(sut.getUrl()).toBe(url);
  });

  it('Should return url correct if exists orderBy', () => {
    const { sut, initialUrl } = makeSut({
      orderBy: { name: 'asc', email: 'desc' },
    });
    const url = `${initialUrl}&sort[0][field]=name&sort[0][direction]=asc&sort[1][field]=email&sort[1][direction]=desc`;
    expect(sut.getUrl()).toBe(url);
  });

  it('Should return url correct if exists where = AND operator', () => {
    const { sut, initialUrl } = makeSut({
      where: { name: 'any_name', email: 'any_email' },
    });
    const url = `${initialUrl}&filterByFormula=AND({name}='any_name',{email}='any_email')`;
    expect(sut.getUrl()).toBe(url);
  });

  it('Should return url correct if exists where = OR operator', () => {
    const { sut, initialUrl } = makeSut({
      where: [{ name: 'any_name', email: 'any_email' }, { name: 'any_name2' }],
    });
    const url = `${initialUrl}&filterByFormula=OR(AND({name}='any_name',{email}='any_email'),AND({name}='any_name2'))`;
    expect(sut.getUrl()).toBe(url);
  });
});
