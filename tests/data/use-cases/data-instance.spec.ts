import { DataInstance } from '@/data/services/data-instance';
import { Repository } from '@/data/services/repository';
import { Field } from '@/domain/contracts';
import { makeSutRepository } from '../mocks';

const makeSut = () => {
  const repository = makeSutRepository().sut;
  const sut = new DataInstance(repository);
  return { sut };
};

describe('DataInstance', () => {
  it('Should return type DataInstance', () => {
    const { sut } = makeSut();
    const result = sut.getRepository({
      tableName: 'Produtos',
      columns: [
        { id: { type: Field.SINGLE_TEXT } },
        { nameUser: { type: Field.SINGLE_TEXT } },
      ],
    });

    expect(result instanceof Repository).toBe(true);
  });
});
