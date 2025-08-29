import type { DisplayedDataType } from '../models/schema';

export function filterYear(data: DisplayedDataType, year: number) {
  return data.map((elem) => {
    return { ...elem, data: elem.data.filter((data) => data.year === year) };
  });
}
