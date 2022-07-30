import { DefaultQueryFind, UrlValidator } from '../../../domain/contracts';

export class WhereUrlValidator implements UrlValidator {
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
