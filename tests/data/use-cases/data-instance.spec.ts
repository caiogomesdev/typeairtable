import { Repository } from '../../../src/data/services/repository';
import {
  TableModel,
  DataInstanceModel,
  RepositoryModel,
  Field,
} from '../../../src/domain/contracts';
import { makeSutRepository } from '../mocks';
export class DataInstance implements DataInstanceModel {
  constructor(private readonly repositoryModel: RepositoryModel) {}

  getRepository<T extends TableModel>(table: T) {
    type Column = keyof T['columns'][number];
    return this.repositoryModel as RepositoryModel<Column>;
  }
}

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
