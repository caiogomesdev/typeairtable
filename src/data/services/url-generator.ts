import {
  ConfigModel,
  DefaultQueryFind,
  TableModel,
} from '../../domain/contracts';
import { GetUrlGenerator } from '../../domain/features/get-url-generator';
import { makeUrlValidators } from '../factories';

export class UrlGenerator implements GetUrlGenerator {
  url: string;

  constructor(
    private readonly config: ConfigModel,
    private readonly table: TableModel,
    private readonly dataInstance: DefaultQueryFind,
    private readonly validators = makeUrlValidators()
  ) {
    this.url = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  }

  getUrl(): string {
    this.validators.forEach((validator) => {
      this.url = validator.validate(this.url, this.dataInstance);
    });
    return this.url;
  }
}
