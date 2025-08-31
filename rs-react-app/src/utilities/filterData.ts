import type { DisplayedDataType } from '../models/schema';

export function filterData(data: DisplayedDataType, filter: string) {
  return data.filter(
    (elem) => elem.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1
  );
}
