import type { DisplayedDataType } from '../models/schema';
import { filterYear } from './filterYear';
import { filterData } from './filterData';
import { sortData } from './sortData';

export function getUpdatedData(
  data: DisplayedDataType,
  year: number | undefined,
  country: string | undefined,
  sortingName: 'population' | 'name' | undefined,
  sortingOrder: '\u2191' | '\u2193' | undefined
) {
  let newData = [...data];
  if (year) {
    newData = filterYear(data, year);
  }
  if (country) {
    newData = filterData(data, country);
  }
  if (sortingName && sortingOrder) {
    newData = sortData(data, sortingName, sortingOrder);
  }
  return newData;
}
