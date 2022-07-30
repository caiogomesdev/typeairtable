import { UrlValidator } from '../../domain/contracts';
import {
  SelectUrlValidator,
  WhereUrlValidator,
  OrderByUrlValidator,
} from '../validators/url-validator';

export const makeUrlValidators = (): UrlValidator[] => {
  const selectValidator = new SelectUrlValidator();
  const whereValidator = new WhereUrlValidator();
  const oderByValidator = new OrderByUrlValidator();
  return [selectValidator, whereValidator, oderByValidator];
};
