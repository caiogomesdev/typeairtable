import { HttpClient } from '../../../src/data/protocols/http/http-client';
import { Repository } from '../../../src/data/services/repository';
import { UrlGenerator } from '../../../src/data/services/url-generator';
import { Field } from '../../../src/domain/contracts';

export const makeSutRepository = () => {
  const baseUrl = 'any_url';
  const apiKey = 'any_api';
  const name = 'any_name';
  const urlGenerator = new UrlGenerator(
    { baseUrl, apiKey },
    { tableName: 'any_name', columns: [{ name: { type: Field.SINGLE_TEXT } }] },
    {}
  );
  const httpClientMock: jest.Mocked<HttpClient> = {
    get: jest.fn(<T = any>(_url: string) => Promise.resolve({} as T)),
  };
  const sut = new Repository(urlGenerator, httpClientMock);
  const url = `${baseUrl}/${name}?api_key=${apiKey}`;
  return { sut, httpClientMock, url };
};
