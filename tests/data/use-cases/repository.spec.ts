import { makeSutRepository } from '../mocks';

describe('Repository', () => {
  it('Should calls url in the method get of httpClient', async () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'get');
    await sut.find({});
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(`${url}&maxRecords=1`);
  });
  it('Should calls correct body on create', () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'post');
    const body = {
      name: 'any_name',
    };
    sut.create(body);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, { fields: body });
  });
});
