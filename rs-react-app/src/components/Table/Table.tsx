import { useMemo, useState } from 'react';
import type { DisplayedDataType } from '../../models/schema';
import style from './style.module.css';
import { useControls } from '../../hooks/useControls/useControls';
import TableBody from '../TableBody/TableBody';
import { getUpdatedData } from '../../utilities/getUpdatedData';

export function Table({ data }: { data: DisplayedDataType }) {
  const {
    controls: { year, country, columns },
  } = useControls();

  const [sortingName, setSortingName] = useState<
    'population' | 'country' | undefined
  >(undefined);
  const [sortingOrder, setSortingOrder] = useState<
    '\u2191' | '\u2193' | undefined
  >(undefined);

  const dataToDisplay = useMemo(
    () => getUpdatedData(data, year, country, sortingName, sortingOrder),
    [data, year, country, sortingName, sortingOrder]
  );

  return (
    <section>
      {
        <table className={style.table}>
          <thead>
            <tr>
              <th
                className={style.cell}
                onClick={() => {
                  if (sortingName !== 'country') {
                    setSortingName('country');
                    setSortingOrder('↑');
                    return;
                  }

                  setSortingOrder((prev) => (prev === '↑' ? '↓' : '↑'));
                }}
              >
                Country{' '}
                {Boolean(sortingOrder) &&
                  sortingName === 'country' &&
                  sortingOrder}
              </th>
              <th className={style.cell}>Year</th>
              <th
                className={style.cell}
                onClick={() => {
                  if (sortingName !== 'population') {
                    setSortingName('population');
                    setSortingOrder('↑');
                    return;
                  }

                  setSortingOrder((prev) => (prev === '↑' ? '↓' : '↑'));
                }}
              >
                Population{' '}
                {Boolean(sortingOrder) &&
                  sortingName === 'population' &&
                  sortingOrder}
              </th>
              <th className={style.cell}>CO2</th>
              <th className={style.cell}>CO2 per capita</th>
              {columns &&
                columns.length !== 0 &&
                columns.map((elem) => (
                  <th className={style.cell} key={elem}>
                    {elem}
                  </th>
                ))}
            </tr>
          </thead>
          <TableBody data={dataToDisplay} />
        </table>
      }
    </section>
  );
}
