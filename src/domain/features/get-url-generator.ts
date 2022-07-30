import { DefaultQueryFind } from '../contracts';

export interface GetUrlGenerator {
  getUrl(dataInstance: DefaultQueryFind): string;
}
