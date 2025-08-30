import { useEffect, useMemo, useState } from 'react';
import type { DisplayedDataType } from '../../models/schema';
import style from './style.module.css';
import { sortData } from '../../utilities/sortData';
import { useControls } from '../../hooks/useControls/useControls';
import TableBody from '../TableBody/TableBody';
import { getUpdatedData } from '../../utilities/getUpdatedData';

export function Table({ data }: { data: DisplayedDataType }) {
  const {
    controls: { year, country, columns },
  } = useControls();
  const [displayedData, setDisplayedData] = useState(data);

  const [populationOrder, setPopulationOrder] = useState<
    '\u2191' | '\u2193' | null
  >(null);
  const [nameOrder, setNameOrder] = useState<'\u2191' | '\u2193' | null>(null);

  const getDataToDisplay = useMemo(
    () => getUpdatedData(data, year, country, undefined, undefined),
    [data, year, country]
  );

  useEffect(() => {
    setDisplayedData(getDataToDisplay);
  }, [getDataToDisplay]);

  const sort = (column: 'population' | 'name', order?: '\u2191' | '\u2193') => {
    setDisplayedData(sortData(data, column, order));
  };

  return (
    <section>
      {
        <table className={style.table}>
          <thead>
            <tr>
              <th
                className={style.cell}
                onClick={() => {
                  const newOrder = !nameOrder
                    ? '\u2191'
                    : nameOrder === '\u2191'
                      ? '\u2193'
                      : '\u2191';
                  setPopulationOrder(null);
                  setNameOrder(newOrder);
                  sort('name', newOrder);
                }}
              >
                Country {Boolean(nameOrder) && nameOrder}
              </th>
              <th className={style.cell}>Year</th>
              <th
                className={style.cell}
                onClick={() => {
                  const newOrder = !populationOrder
                    ? '\u2191'
                    : populationOrder === '\u2191'
                      ? '\u2193'
                      : '\u2191';
                  setPopulationOrder(newOrder);
                  setNameOrder(null);
                  sort('population', newOrder);
                }}
              >
                Population {Boolean(populationOrder) && populationOrder}
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
          <TableBody data={displayedData} />
        </table>
      }
    </section>
  );
}
