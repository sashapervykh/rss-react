import type { DisplayedDataType } from '../models/schema';

export function sortData(
  data: DisplayedDataType,
  column: 'population' | 'name',
  order?: '\u2191' | '\u2193'
) {
  const arr = [...data];
  if (column === 'name' && order === '\u2191') return arr.sort();
  if (column === 'name' && order === '\u2193') return arr.sort().reverse();
  if (column === 'population' && order === '\u2191') {
    return arr.sort((a, b) => {
      const population1 = a.data.at(-1)?.population;
      const population2 = b.data.at(-1)?.population;
      if (!population1 && !population2) return 0;
      if (!population1) return 1;
      if (!population2) return -1;
      return population1 - population2;
    });
  }
  if (column === 'population' && order === '\u2193') {
    return arr.sort((a, b) => {
      const population1 = a.data.at(-1)?.population;
      const population2 = b.data.at(-1)?.population;
      if (!population1 && !population2) return 0;
      if (!population1) return -1;
      if (!population2) return 1;
      return population2 - population1;
    });
  }
  return data;
}
