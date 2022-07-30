import {
  DefaultQueryFind,
  UrlValidator,
  Where,
} from '../../../domain/contracts';

type AllWhere = Where<any> | Where<any>[];

export class WhereUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    if (!dataInstance.where || !Object.keys(dataInstance.where).length) {
      return url;
    }
    url = `${url}&filterByFormula=`;
    return url + this.generateUrl(dataInstance.where);
  }

  private generateUrl(where: AllWhere): string {
    const isArray = Array.isArray(where);
    if (isArray) {
      return this.generateOR(where);
    }
    return this.generateAND(where);
  }

  private generateAND(where: Where<any>): string {
    const whereArray = Object.keys(where).map((item) => {
      const value = where[item];
      return `{${item}}='${value}'`;
    });
    return `AND(${whereArray.join(',')})`;
  }

  private generateOR(where: Where<any>[]): string {
    const orArray = where.reduce((acc, item) => {
      return `${acc},${this.generateAND(item as any)}`;
    }, '');
    return `OR(${orArray.substring(1)})`;
  }
}
