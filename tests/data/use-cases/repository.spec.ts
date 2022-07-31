import { makeSutRepository } from '../mocks';

describe('Repository', () => {
  it('Should calls url in the method get of httpClient', async () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'get');
    await sut.find({});
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(`${url}&maxRecords=1`);
  });
});
