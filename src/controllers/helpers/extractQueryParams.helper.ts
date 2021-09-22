import { FindManyOptions, OrderByCondition } from 'typeorm';
import { User } from '@entity/user.entity';

export const extractQueryParams = (query: any) => {
  let findOptions: FindManyOptions<User> = <FindManyOptions<User>>{};

  function containsOnlyDigits(string: string): boolean {
    return /^\d+$/.test(string);
  }

  function isValidOrderByCondition(parts: { [columnName: string]: string }): boolean {
    return <OrderByCondition>parts !== undefined;
  }

  function extractOrderParam(orderEle: string) {
    let columnName: string = '';
    let ordering: string = '';
    const parts: string[] = (<string>orderEle)?.split(':');
    if (parts && parts.length >= 2) {
      [columnName, ordering] = parts;
    }
    if (columnName && ordering && isValidOrderByCondition({ [columnName]: ordering.toUpperCase() })) {
      return <OrderByCondition>{ [columnName]: ordering.toUpperCase() };
    }
  }

  if (query.take && containsOnlyDigits(`${query.take}`)) {
    findOptions['take'] = parseInt(`${query.take}`);
  }

  if (query.skip && containsOnlyDigits(`${query.skip}`)) {
    findOptions['skip'] = parseInt(`${query.skip}`);
  }

  if (query.order) {
    if (!Array.isArray(query.order)) {
      query.order = [query.order];
    }
    for (const orderCondition of query.order) {
      findOptions['order'] = { ...findOptions['order'], ...extractOrderParam(orderCondition) };
    }
  }

  return findOptions;
};
